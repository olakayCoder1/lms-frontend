// import { Course } from '../../types/course';
// import ProductFour from '../../images/product/product-04.png';

// const productData: Course[] = [
//   {
//     image: ProductFour,
//     name: 'Introduction to Data Analysis',
//     code: 'CSC310',
//     rank: 296,
//     credits: 22,
//     students: 45,
//   },
//   {
//     image: ProductFour,
//     name: 'Introduction to Data Analysis',
//     code: 'CSC310',
//     rank: 296,
//     credits: 22,
//     students: 45,
//   },
//   {
//     image: ProductFour,
//     name: 'Introduction to Data Analysis',
//     code: 'CSC310',
//     rank: 296,
//     credits: 22,
//     students: 45,
//   },
  
// ];

// const StudentMaterialsTable = () => {
//   return (
//     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//       <div className="py-6 px-4 md:px-6 xl:px-7.5">
//         <h4 className="text-xl font-semibold text-black dark:text-white">
//           Materials
//         </h4>
//       </div>

//       <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
//         <div className="col-span-3 flex items-center">
//           <p className="font-medium">Course</p>
//         </div>
//         <div className="col-span-2 hidden items-center sm:flex">
//           <p className="font-medium">Title</p>
//         </div>
//         <div className="col-span-1 flex items-center">
//           <p className="font-medium">Students</p>
//         </div>
//         <div className="col-span-1 flex items-center">
//           <p className="font-medium">Credits</p>
//         </div>
//         <div className="col-span-1 flex items-center">
//           <p className="font-medium">Rank</p>
//         </div>
//       </div>

//       {productData.map((product, key) => (
//         <div
//           className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
//           key={key}
//         >
//           <div className="col-span-3 flex items-center">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//               <div className="h-12.5 w-15 rounded-md">
//                 <img src={product.image} alt="Product" />
//               </div>
//               <p className="text-sm text-black dark:text-white">
//                 {product.code}
//               </p>
//             </div>
//           </div>
//           <div className="col-span-2 hidden items-center sm:flex">
//             <p className="text-sm text-black dark:text-white">
//               {product.name}
//             </p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="text-sm text-black dark:text-white">
//               {product.students}
//             </p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="text-sm text-black dark:text-white">{product.credits}</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="text-sm text-meta-3">{product.rank}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentMaterialsTable;


import React, { useState, useRef, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { Course } from '../../types/course';
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

const StudentMaterialsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const docs = [
    { uri: 'https://pdfobject.com/pdf/sample.pdf' }, // Remote file
    // Add other document URLs here as needed
  ];

  const openModal = (docUri: string) => {
    setSelectedDoc(docUri);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    // Add event listener for outside click
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">Materials</h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark  md:px-6 2xl:px-7.5">
          <div className="col-span-2 hidden sm:flex items-center">
            <p className="font-medium">Course</p>
          </div>
          <div className="col-span-5 sm:col-span-3 items-center ">
            <p className="font-medium">Title</p>
          </div>
          {/* <div className="col-span-1 flex items-center">
            <p className="font-medium">Students</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Credits</p>
          </div> */}
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Action</p>
          </div>
        </div>

        {productData.map((product, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark  md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-2 hidden sm:flex items-center">
              <div className="flex flex-col  gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <img src={product.image} alt="Product" />
                </div>
                <p className="text-sm text-black dark:text-white">{product.code}</p>
              </div>
            </div>
            <div className=" col-span-5 sm:col-span-3 items-center">
              <p className="text-sm text-black dark:text-white">{product.name}</p>
            </div>
            {/* <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{product.students}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{product.credits}</p>
            </div> */}
            <div className="col-span-1 flex items-center">
              <a onClick={() => openModal(docs[0].uri)} className="text-sm text-meta-3 cursor-pointer">View</a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Document Viewer */}
      {isModalOpen && selectedDoc && (
        <div className="fixed top-0 inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-9999">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-full sm:w-3/4 max-w-3xl p-4 relative"
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            {/* Document viewer */}
            <DocViewer className='w-full' documents={[{ uri: selectedDoc }]} pluginRenderers={DocViewerRenderers} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMaterialsTable;
