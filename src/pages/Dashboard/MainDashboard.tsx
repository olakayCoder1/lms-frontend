import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/ContextProvider'
import Student from './Student'
import Tutor from './Tutor'


export default function MainDashboard() {


    const { authUser } = useContext(AuthContext)
    

    return (
        <>
        {
            authUser?.role === "tutor" ? (
                <Tutor />
            ):(
                <Student />
            )
        }
            
        </>
    )
}
