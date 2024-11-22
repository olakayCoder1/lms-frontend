import React, { useState } from "react";
import { createContext } from "react";
import { toast } from 'react-toastify';


export const AuthContext = createContext()




export default function AuthContextProvider({children}){
    
    

    const [ authUser , setAuthUser ] = React.useState(()=> JSON.parse(localStorage.getItem('user'))|| null);

    const [ isLoading , setIsLoading ] = useState(null)

    
    function displayNotification(type: string, text: any ){
        if(type==='info'){
            toast.info(`${text}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        else if(type==='success'){
            toast.success(`${text}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        else if(type==='error'){
            toast.error(`${text}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }else{
            toast(`${text}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }


    const value = {  displayNotification, authUser , setAuthUser}
     
    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}