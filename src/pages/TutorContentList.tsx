import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TutorCoursesTable from '../components/Tables/TutorCoursesTable';

export default function TutorContentList() {
    

    return (
        <>
        <Breadcrumb pageName="Contents" />

        <div className="flex flex-col gap-10">
            <TutorCoursesTable />
        </div>
            
        </>
    )
}
