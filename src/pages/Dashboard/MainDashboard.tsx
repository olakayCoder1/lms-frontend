import { useContext } from 'react'
import { AuthContext } from '../../contexts/ContextProvider'
import Student from './Student'
import Tutor from './Tutor'
import Admin from './Admin'


export default function MainDashboard() {


    const { authUser } = useContext<any>(AuthContext)
    

    return (
        <>
        {
            authUser?.role === "tutor" ? (
                <Tutor />
            ):(
                authUser?.role === 'admin' ? (
                    <Admin />
                ): (<Student />)
            )
        }
            
        </>
    )
}
