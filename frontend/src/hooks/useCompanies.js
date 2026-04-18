import { useEffect, useState } from "react";
import axios from "axios";

export const useCompanies = ()=>{
    const [companies,setCompanies] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect(() => {
      const fetchCompanies=async()=>{
        setLoading(true);
        try {
            const response = await axios.get("/api/companies");
            // console.log(response.data)
            setCompanies(response.data.data);
        } catch (error) {
            setError(error.response?.data || "Network Error");
        } finally {
            setLoading(false);
        }
      }
        fetchCompanies();
    }, [])
    return {companies,loading,error};
};