import { Course } from '../../types/course';
import { Link } from 'react-router-dom';
import ProductFour from '../../images/product/product-04.png';

const productData: Course[] = [
  {
    image: ProductFour,
    name: 'Introduction to Data Analysis',
    code: 'CSC310',
    rank: 296,
    credits: 22,
    students: 45,
  },
  {
    image: ProductFour,
    name: 'Introduction to Data Analysis',
    code: 'CSC310',
    rank: 296,
    credits: 22,
    students: 45,
  },
  {
    image: ProductFour,
    name: 'Introduction to Data Analysis',
    code: 'CSC310',
    rank: 296,
    credits: 22,
    students: 45,
  },
  
];

const TutorCoursesTable = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Contents
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Content</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Title</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Students</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Credits</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Action</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={product.image} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.code}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.name}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.students}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.credits}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <Link to={'/content-management/list/introduction-to-react'} className="text-sm text-meta-3">View</Link>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default TutorCoursesTable;
