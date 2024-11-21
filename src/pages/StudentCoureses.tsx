import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import StudentCoursesTable from '../components/Tables/StudentCoursesTable';

const StudentCoureses = () => {
  return (
    <>
      <Breadcrumb pageName="Courses" />

      <div className="flex flex-col gap-10">
        <StudentCoursesTable />
      </div>
    </>
  );
};

export default StudentCoureses;
