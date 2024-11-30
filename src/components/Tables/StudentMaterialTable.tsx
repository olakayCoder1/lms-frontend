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





// import React, { useState, useRef, useEffect } from 'react';
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";
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

// const StudentMaterialTable = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  // const modalRef = useRef<HTMLDivElement | null>(null);

  // const docs = [
  //   { uri: 'https://pdfobject.com/pdf/sample.pdf' }, // Remote file
  //   // Add other document URLs here as needed
  // ];

  // const openModal = (docUri: string) => {
  //   setSelectedDoc(docUri);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => setIsModalOpen(false);

  // // Close modal if clicked outside
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
  //       closeModal();
  //     }
  //   };

  //   // Add event listener for outside click
  //   document.addEventListener('mousedown', handleClickOutside);

  //   // Cleanup event listener on component unmount
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

//   return (
//     <div>
//       <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="py-6 px-4 md:px-6 xl:px-7.5">
//           <h4 className="text-xl font-semibold text-black dark:text-white">Materials</h4>
//         </div>

//         <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark  md:px-6 2xl:px-7.5">
//           <div className="col-span-2 hidden sm:flex items-center">
//             <p className="font-medium">Content</p>
//           </div>
//           <div className="col-span-5 sm:col-span-3 items-center ">
//             <p className="font-medium">Title</p>
//           </div>
//           {/* <div className="col-span-1 flex items-center">
//             <p className="font-medium">Students</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Credits</p>
//           </div> */}
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Action</p>
//           </div>
//         </div>

//         {productData.map((product, key) => (
//           <div
//             className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark  md:px-6 2xl:px-7.5"
//             key={key}
//           >
//             <div className="col-span-2 hidden sm:flex items-center">
//               <div className="flex flex-col  gap-4 sm:flex-row sm:items-center">
//                 <div className="h-12.5 w-15 rounded-md">
//                   <img src={product.image} alt="Product" />
//                 </div>
//                 <p className="text-sm text-black dark:text-white">{product.code}</p>
//               </div>
//             </div>
//             <div className=" col-span-5 sm:col-span-3 items-center">
//               <p className="text-sm text-black dark:text-white">{product.name}</p>
//             </div>
//             {/* <div className="col-span-1 flex items-center">
//               <p className="text-sm text-black dark:text-white">{product.students}</p>
//             </div>
//             <div className="col-span-1 flex items-center">
//               <p className="text-sm text-black dark:text-white">{product.credits}</p>
//             </div> */}
//             <div className="col-span-1 flex items-center">
//               <a onClick={() => openModal(docs[0].uri)} className="text-sm text-meta-3 cursor-pointer">View</a> <span className='px-2'>/</span>
//               <a onClick={() => openModal(docs[0].uri)} className="text-sm text-meta-3 cursor-pointer">Delete</a>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Document Viewer */}
      // {isModalOpen && selectedDoc && (
      //   <div className="fixed top-0 inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-9999">
      //     <div
      //       ref={modalRef}
      //       className="bg-white rounded-lg shadow-lg w-full sm:w-3/4 max-w-3xl p-4 relative"
      //     >
      //       {/* Close button */}
      //       <button
      //         onClick={closeModal}
      //         className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-800"
      //       >
      //         &times;
      //       </button>
      //       {/* Document viewer */}
      //       <DocViewer className='w-full' documents={[{ uri: selectedDoc }]} pluginRenderers={DocViewerRenderers} />
      //     </div>
      //   </div>
      // )}
//     </div>
//   );
// };

// export default StudentMaterialTable;




import { useContext, useEffect, useRef, useState } from 'react';
import { Package } from '../../types/package';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { AuthContext } from '../../contexts/ContextProvider';

const packageData: Package[] = [
  {
    name: 'Godfirst Precious',
    price: 0.0,
    invoiceDate: `Jan 13,2023`,
    status: 'Paid',
  },
  {
    name: 'Lionel Messi',
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: 'Paid',
  },
  {
    name: 'C Ronaldo',
    price: 99.0,
    invoiceDate: `Jan 13,2023`,
    status: 'Unpaid',
  },
  {
    name: 'Olakay Taiwo',
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: 'Pending',
  },
];

const StudentMaterialTable = () => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [materials, setMaterials] = useState([])

  const {fetchWithAuth,formatDate} = useContext(AuthContext)

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
  

  useEffect(() => {
    async function fetchMaterials() {
        try {
            const data = await fetchWithAuth({
            method: 'GET',
            path: `/contents/materials/`,
            });
            console.log(data)
            setMaterials(data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }

    }
    fetchMaterials();
  }, [])


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Title
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Added date
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {materials.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.title}
                  </h5>
                  {/* <p className="text-sm">${packageItem.price}</p> */}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(packageItem.created_at)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button onClick={() => openModal(docs[0].uri)}
                       className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                          fill=""
                        />
                        <path
                          d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
};

export default StudentMaterialTable;
