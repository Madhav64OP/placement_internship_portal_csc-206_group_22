import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch , useSelector } from "react-redux"
import { setCompanies } from "../store/companySlice";

export const useCompanies = ()=>{
    const dispatch = useDispatch();   
    const { data: companies, hasFetched } = useSelector((state) => state.companies);
    
    const [loading,setLoading] = useState(!hasFetched);
    const [error,setError] = useState(null);

    useEffect(() => {
        if(hasFetched){
            setLoading(false);
            return;
        }

        const fetchCompanies=async()=>{
            setLoading(true);
            try {
                const response = await axios.get("/api/companies");
                // console.log(response.data)
                dispatch(setCompanies(response.data.data));
            } catch (error) {
                setError(error.response?.data || "Network Error");
            } finally {
                setLoading(false);
            }
        }

        fetchCompanies();
    }, [hasFetched,dispatch]);
    
    return {companies,loading,error};
};