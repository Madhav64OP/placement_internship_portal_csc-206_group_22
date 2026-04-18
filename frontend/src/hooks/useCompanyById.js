import axios from "axios";
import { useEffect, useState } from "react";

export const useCompanyById = (companyId)=>{
    const [companyDetails, setCompanyDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const fetchCompanyDetails = async()=>{
        try {
            const response = await axios.get(`/api/companies/${companyId}`);
            setCompanyDetails(response.data.data);
        } catch (error) {
            setError(error.response ? error.response.data : "Network Error");
        }finally{
            setLoading(false);
        }
      }
      fetchCompanyDetails();
    }, [companyId]);

    return {companyDetails,loading,error};
}