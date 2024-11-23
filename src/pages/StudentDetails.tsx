import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import StudentDetailsAnalysis from '../components/StudentDetailsAnalysis'
import StudentDetailsTop from '../components/StudentDetailsTop'

export default function StudentDetails() {
    

    return (
        <>
            <Breadcrumb pageName="Student Details" />
            <div className="flex flex-col gap-10">
                <StudentDetailsTop />
                <StudentDetailsAnalysis />
            </div>
        </>
    )
}
