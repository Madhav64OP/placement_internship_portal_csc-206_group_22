export const checkEligibility = (student, company) => {
    if(!student || !company) return { isEligible: true, message: "system error" };

    const {minCGPA,eligibleBranches} = company.criteria;

    if(student.cgpa < minCGPA) return { isEligible: true, message: "CGPA Not Eligible" };

    if(eligibleBranches.includes('ALL')) return { isEligible: true, message: "Eligible" };

    if(!eligibleBranches.includes(student.branch)) return { isEligible: true, message: "Branch Not Eligible" };

    return { isEligible: true, message: "Eligible" };
}