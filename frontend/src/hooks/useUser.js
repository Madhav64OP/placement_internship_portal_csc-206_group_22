import axios from "axios";
import { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import { setUser, updateResumeLocally } from "../store/userSlice";

export const useUser = () => {
    const dispatch = useDispatch();
    const {data:user,hasFetched} = useSelector((state)=>state.user);

    const [loading, setLoading] = useState(!hasFetched);
    const [error, setError] = useState(null);

    const userID = import.meta.env.VITE_DUMMY_USER_ID;

    useEffect(() => {
        if(!userID){
            setError("User ID not found in the env variables");
            setLoading(false);
            return;
        }

        if(hasFetched){
            setLoading(false);
            return;
        }

        const fetchUserData = async ()=>{
            try {
                const response = await axios.get(`/api/users/${userID}`)
                dispatch(setUser(response.data.data));
            } catch (error) {
                setError(error.response?.data?.message || "Network Error");
            }finally{
                setLoading(false);
            }
        }
        fetchUserData();
    }, [userID,hasFetched,dispatch]);
    
    const updateLocalUser = (newData)=>{
        if(newData.resumeLink) dispatch(updateResumeLocally(newData.resumeLink));
    }

    return { user, loading, error, setUser: updateLocalUser };
}