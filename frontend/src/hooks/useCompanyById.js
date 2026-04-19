import { useEffect, useState } from "react";
import { useCompanies } from "./useCompanies";

export const useCompanyById = (companyId)=>{
    const { companies, loading: companiesLoading, error: companiesError } = useCompanies();

    const [companyDetails, setCompanyDetails] = useState(null);
    
    useEffect(() => {
      if(companies && companies.length > 0){
        const found = companies.find(comp=> comp._id==companyId);
        setCompanyDetails(found || null);
      }
    }, [companies,companyId]);

    return {companyDetails,loading:companiesLoading,error:companiesError};
}