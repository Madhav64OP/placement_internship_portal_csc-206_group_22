export const checkEligibility = (student, company) => {
    if(!student || !company || !company.criteria) return { isEligible: false, message: "Data Loading Error" };
    const {minCGPA,eligibleBranches} = company.criteria;
    if(eligibleBranches.includes('ALL')) return { isEligible: true, message: "Eligible" };


    if(minCGPA && student.cgpa < minCGPA) return { isEligible: false, message: "CGPA Not Eligible" };

    if(!eligibleBranches.includes(student.branchTag)) return { isEligible: false, message: "Branch Not Eligible" };

    return { isEligible: true, message: "Eligible" };
}