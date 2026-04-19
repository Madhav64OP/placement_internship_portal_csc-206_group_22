import { useCallback, useState } from "react";

export const usePopup = () => {
    const [popup, setPopup] = useState({
        isOpen: false,
        heading: "",
        message: "",
        type: "info"
    });

    const showPopup = useCallback((heading,message,type='info')=>{
        setPopup({
            isOpen:true,
            heading,
            message,
            type
        })
    },[]);

    const closePopup = useCallback(()=>{
        setPopup(prev=>({
            ...prev,
            isOpen:false
        }))
    },[]);

    

    return {popup,showPopup,closePopup};
}