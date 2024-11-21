import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import StudentMaterialsTable from '../components/Tables/StudentMaterialsTable';

const StudentMaterials = () => {
  return (
    <>
      <Breadcrumb pageName="Materials" />

      <div className="flex flex-col gap-10">
        <StudentMaterialsTable />
      </div>
    </>
  );
};

export default StudentMaterials;
