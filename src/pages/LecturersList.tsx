import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CardDataStats from '../components/CardDataStats';
import TutorMaterialsTable from '../components/Tables/TutorMaterialsTable'
import { AuthContext } from '../contexts/ContextProvider';
import LecturersTable from '../components/Tables/LecturersTable';

export default function LecturersList() {

    const {fetchWithAuth} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    


    const [lecturersOverview, setMaterialsOverview] = useState({})
    

    useEffect(() => {
        async function fetchMaterials() {
            try {
                setIsLoading(true)
                const data = await fetchWithAuth({
                method: 'GET',
                path: `/lecturers/overview`,
                });
                console.log(data)
                setMaterialsOverview(data?.data);
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setIsLoading(false)
            }
    
        }
        fetchMaterials();
      }, [])


    

    return (
        <>
        <Breadcrumb pageName="Lecturers" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:gap-7.5 mb-12">
            <CardDataStats title="Total Lectures" total={lecturersOverview?.total_tutors} isLoading={isLoading}>
                <svg
                    className="fill-primary dark:fill-white"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
                    fill=""
                    />
                    <path
                    d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
                    fill=""
                    />
                </svg>
            </CardDataStats>
        </div>
        <div className="flex flex-col gap-10">
            <LecturersTable />
        </div>
            
        </>
    )
}
