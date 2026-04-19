import { useCallback, useEffect, useState } from "react";
import { useUser } from "./useUser";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setApplications, addApplicationLocally } from "../store/applicationSlice";

export const useApplications = () => {
    const {user}= useUser();

    const dispatch = useDispatch();
    const { data: applications, hasFetched } = useSelector((state) => state.applications);

    const [loading, setLoading] = useState(!hasFetched);
    const [error, setError] = useState(null);

    const fetchApplications = useCallback(async () =>{
        if(!user) {
            // setError("User not logged in");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`/api/applications/student/${user._id}`);
            dispatch(setApplications(response.data));
        } catch (error) {
            // console.log(error);
            setError(error.response?.data?.message || "Failed to fetch applications");
        } finally {
            setLoading(false);
        }
    }, [user,dispatch]);

    useEffect(()=>{
        if(hasFetched || !user){
            setLoading(false);
            return;
        }

        fetchApplications();
    },[fetchApplications,hasFetched,user]);

    const addLocalApplication = (newApplication) =>{
        dispatch(addApplicationLocally(newApplication));
    }

    return { applications, loading, error, refetchApps:fetchApplications ,addLocalApplication};
}