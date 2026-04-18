import axios from "axios";
// import { set } from "mongoose";
import { useEffect, useState } from "react";

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userID = import.meta.env.VITE_DUMMY_USER_ID;

    useEffect(() => {
        if(!userID){
            setError("User ID not found in the env variables");
            setLoading(false);
            return;
        }

        const fetchUserData = async ()=>{
            try {
                const response = await axios.get(`/api/users/${userID}`)
                setUser(response.data.data);
            } catch (error) {
                setError(error.response?.data?.message || "Network Error");
            }finally{
                setLoading(false);
            }
        }
        fetchUserData();
    }, [userID])
    
    return { user, loading, error, setUser };
}