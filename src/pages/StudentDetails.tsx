import { useContext, useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import StudentDetailsAnalysis from '../components/StudentDetailsAnalysis'
import StudentDetailsTop from '../components/StudentDetailsTop'
import { AuthContext } from '../contexts/ContextProvider'
import { useParams } from 'react-router-dom'

export default function StudentDetails() {
    
    const {fetchWithAuth} = useContext(AuthContext)
    const [student, setStudent] = useState({})
    // get the user id from param
    const { id } = useParams();

    useEffect(() => {
        async function fetchStudent() {
            try {
                const data = await fetchWithAuth({
                method: 'GET',
                path: `/students/${id}`,
                });
                console.log(data)
                setStudent(data?.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
  
        }
        fetchStudent();
    }, [])



    return (
        <>
            <Breadcrumb pageName={`${student?.first_name} ${student?.last_name}`} />
            <div className="flex flex-col gap-10">
                <StudentDetailsTop student={student} user_id={id}/>
                <StudentDetailsAnalysis user_id={id}/>
            </div>
        </>
    )
}
