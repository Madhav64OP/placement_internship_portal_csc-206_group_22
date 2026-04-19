import { useCallback, useEffect, useState } from "react";
import { useUser } from "./useUser";
import axios from "axios";

export const useApplications = () => {
    const {user}= useUser();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApplications = useCallback(async ()=>{
        if(!user) {
            // setError("User not logged in");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`/api/applications/student/${user._id}`);
            setApplications(response.data);
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Failed to fetch applications");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(()=>{
        fetchApplications();
    },[fetchApplications])

    return { applications, loading, error, refetchApps:fetchApplications };
}