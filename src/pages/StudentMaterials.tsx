import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import StudentMaterialTable from '../components/Tables/StudentMaterialTable';

const StudentMaterials = () => {
  return (
    <>
      <Breadcrumb pageName="Course Materials" />

      <div className="flex flex-col gap-10">
        <StudentMaterialTable />
      </div>
    </>
  );
};

export default StudentMaterials;
