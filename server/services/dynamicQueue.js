import Company from "../models/Company.js"
import Application from "../models/Application.js";
import User from "../models/User.js";

export const runDynamicQueueAlgorithim = async(io)=>{
    try {
        const activeCompanies = await Company.find({currentStage:'Interview'});
        const totalCompaniesOnDay = activeCompanies.length;

        const allApplications = await Application.find({
            companyId:{$in: activeCompanies.map(comp =>comp._id)},
            status:'Shortlisted'
        }).populate('studentId','name cgpa _id');

        let companyQueues = {};
        activeCompanies.forEach(comp => companyQueues[comp._id] = []);

        let studentShortlistCount = {};
        allApplications.forEach(applicaiton => {
            const sid = applicaiton.studentId._id.toString();
            studentShortlistCount[sid] = (studentShortlistCount[sid] || 0) + 1;
        })

        // Assignment of Priorities

        allApplications.forEach((app=>{
            const candidate ={
                id:app.studentId._id,
                name:app.studentId.name,
                cgpa:app.studentId.cgpa,
                appId:app._id.toString(),
            }
            candidate.priority = (totalCompaniesOnDay - studentShortlistCount[candidate.id] + 1);

            if(companyQueues[app.companyId]){
                companyQueues[app.companyId].push(candidate);
            }
        }))
        
        for(let compId in companyQueues){
            companyQueues[compId].sort((a,b)=>{
                if(b.priority!==a.priority) return a.priority - b.priority;
                return b.cgpa-a.cgpa;
            })
        }

        let busyTrackerHashMap = {};
        let finalSchedule = [];

        let maxExpectedSlots = Math.max(...Object.values(companyQueues).map(q=>q.length))

        let timeSlot = 0;

        while (Object.values(companyQueues).some(q => q.length > 0)) {
            
            busyTrackerHashMap[timeSlot] = new Set();
            finalSchedule[timeSlot] = {};

            for(let compId in companyQueues){
                let pendingQueue = companyQueues[compId]
                let studentIdx = 0;
                
                while(studentIdx <pendingQueue.length){
                    let currentCandidate= pendingQueue[studentIdx];

                    if(!busyTrackerHashMap[timeSlot].has(currentCandidate.id)){
                        finalSchedule[timeSlot][compId] = currentCandidate;
                        busyTrackerHashMap[timeSlot].add(currentCandidate.id);

                        pendingQueue.splice(studentIdx,1);
                        break;
                    }
                    else{
                        studentIdx++;
                    }
                }
            }
            
            timeSlot++;
            
            if (timeSlot > 100) {
                console.log("CRITICAL: Algorithm hit failsafe loop limit.");
                break; 
            }
        }

        let broadcastData = {};
        activeCompanies.forEach(comp=>broadcastData[comp._id]=[])

        for(let timeSlot = 0;timeSlot<finalSchedule.length ; timeSlot++){
            for(let compId in finalSchedule[timeSlot]){
                broadcastData[compId].push(finalSchedule[timeSlot][compId])
            }
        }

        io.emit('queue_updated',broadcastData);

    } catch (error) {
        console.error("Algo Error is ther",error);
    }
}

export const initializeSocketEvents = (io) => {
    io.on('connection', (socket) => {
        socket.on('trigger_algorithm', () => {
            runDynamicQueueAlgorithim(io);
        });

        socket.on('request_shift', async (data) => {
            console.log(`Shift requested by student ${data.studentId}`);
            await runDynamicQueueAlgorithim(io); 
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};