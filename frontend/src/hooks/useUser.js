import {useDispatch,useSelector} from "react-redux"
import { logoutUser, updateResumeLocally } from "../store/userSlice";

export const useUser = () => {
    const dispatch = useDispatch();
    const {data:user,hasFetched} = useSelector((state)=>state.user);

    const updateLocalUser = (newData) => {
        if (newData.resumeLink) dispatch(updateResumeLocally(newData.resumeLink));
    }

    const logout = () => {
        dispatch(logoutUser());
    }
    

    return { 
        user, 
        loading: false,
        error: null, 
        setUser: updateLocalUser,
        logout 
    };
}