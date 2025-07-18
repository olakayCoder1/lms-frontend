// import { useContext, useEffect, useRef, useState } from 'react';
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import { AuthContext } from '../../contexts/ContextProvider';
// import InAppLoader from '../InAppLoader';

// const StudentMaterialTable = () => {


//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
//   const modalRef = useRef<HTMLDivElement | null>(null);
//   const [isLoading, setIsLoading] = useState(true)

//   const [materials, setMaterials] = useState([])

//   const {fetchWithAuth,formatDate} = useContext(AuthContext)

//   const docs = [
//     { uri: 'https://pdfobject.com/pdf/sample.pdf' }, // Remote file
//     // Add other document URLs here as needed
//   ];

//   const openModal = (docUri: string) => {
//     setSelectedDoc(docUri);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => setIsModalOpen(false);

//   // Close modal if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//         closeModal();
//       }
//     };

//     // Add event listener for outside click
//     document.addEventListener('mousedown', handleClickOutside);

//     // Cleanup event listener on component unmount
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);
  

//   useEffect(() => {
//     async function fetchMaterials() {
//         try {
//           setIsLoading(true)
//             const data = await fetchWithAuth({
//             method: 'GET',
//             path: `/contents/materials/`,
//             });
//             setMaterials(data?.data);
//             setIsLoading(false)
//         } catch (error) {
//             console.error('Error fetching user profile:', error);
//             setIsLoading(false)
//         }

//     }
//     fetchMaterials();
//   }, [])


//   const handleDownload = async (item) => {
//     // Create a link element for download
//     const link = document.createElement('a');
//     link.href = item.file; // Assuming item.file is the URL of the file
//     link.download = ''; // This attribute makes the browser download the file instead of navigating to it

//     // Append the link to the body (not visible to the user)
//     document.body.appendChild(link);
//     link.target = '_blank';
//     link.click();

//     // make api call to log the download
//     try {
//         await fetchWithAuth({
//         method: 'GET',
//         path: `/contents/material/${item?.id}/download`,
//         });
//     } catch (error) {
//     }



//     // Remove the link after triggering the download
//     document.body.removeChild(link);
// };



//   return (
//     <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//       <div className="max-w-full overflow-x-auto">
//         {
//           isLoading ? (
//             <InAppLoader isLoadingText="Fecthing materials" />
//           ):(
//             <table className="w-full table-auto">
//               <thead>
//                 <tr className="bg-gray-2 text-left dark:bg-meta-4">
//                   <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
//                     Title
//                   </th>
//                   <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
//                     Added date
//                   </th>
//                   <th className="py-4 px-4 font-medium text-black dark:text-white">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {materials.length === 0 ? (
//                   <tr>
//                     <td colSpan="3" className="text-center py-8 text-gray-500">
//                       No materials available.
//                     </td>
//                   </tr>
//                 ): (
//                   <>
//                     {materials?.map((packageItem, key) => (
//                     <tr key={key}>
//                       <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
//                         <h5 className="font-medium text-black dark:text-white">
//                           {packageItem.title}
//                         </h5>
//                         {/* <p className="text-sm">${packageItem.price}</p> */}
//                       </td>
//                       <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                         <p className="text-black dark:text-white">
//                           {formatDate(packageItem.created_at)}
//                         </p>
//                       </td>
//                       <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                         <div className="flex items-center space-x-3.5">
//                           <button onClick={() => openModal(docs[0].uri)}
//                             className="hover:text-primary">
//                             <svg
//                               className="fill-current"
//                               width="18"
//                               height="18"
//                               viewBox="0 0 18 18"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
//                                 fill=""
//                               />
//                               <path
//                                 d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </button>
//                           <button onClick={()=> handleDownload(packageItem)} className="hover:text-primary">
//                             <svg
//                               className="fill-current"
//                               width="18"
//                               height="18"
//                               viewBox="0 0 18 18"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
//                                 fill=""
//                               />
//                               <path
//                                 d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                   </>
//                 )}
                
//               </tbody>
//             </table>
//           )
//         }
        
        
//         {isModalOpen && selectedDoc && (
//         <div className="fixed top-0 inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-9999">
//           <div
//             ref={modalRef}
//             className="bg-white rounded-lg shadow-lg w-full sm:w-3/4 max-w-3xl p-4 relative"
//           >
//             {/* Close button */}
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-800"
//             >
//               &times;
//             </button>
//             {/* Document viewer */}
//             <DocViewer className='w-full' documents={[{ uri: selectedDoc }]} pluginRenderers={DocViewerRenderers} />
//           </div>
//         </div>
//       )}
//       </div>
//     </div>
//   );
// };

// export default StudentMaterialTable;



import { useContext, useEffect, useRef, useState } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { AuthContext } from '../../contexts/ContextProvider';
import InAppLoader from '../InAppLoader';

const StudentMaterialTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [materials, setMaterials] = useState<any[]>([]); // Define materials array with any type

  const { fetchWithAuth, formatDate } = useContext(AuthContext);

  // Open modal function to set selected doc URI
  const openModal = async (docUri: string, item_id:string) => {
    setSelectedDoc(docUri);
    setIsModalOpen(true);

    // Log the download with API call
    try {
      await fetchWithAuth({
        method: 'GET',
        path: `/contents/material/${item_id}/download`,
      });
    } catch (error) {
      console.error('Error logging download:', error);
    }
  };

  // Close modal function
  const closeModal = () => setIsModalOpen(false);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch materials from backend
  useEffect(() => {
    async function fetchMaterials() {
      try {
        setIsLoading(true);
        const data = await fetchWithAuth({
          method: 'GET',
          path: '/contents/materials/',
        });
        setMaterials(data?.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching materials:', error);
        setIsLoading(false);
      }
    }
    fetchMaterials();
  }, []);

  // Handle download of material
  const handleDownload = async (item: any) => {
    const link = document.createElement('a');
    link.href = item.file; // Assuming item.file is the file URL
    link.download = ''; // Force download instead of opening the file
    document.body.appendChild(link);
    link.target = '_blank';
    link.click();

    // Log the download with API call
    try {
      await fetchWithAuth({
        method: 'GET',
        path: `/contents/material/${item?.id}/download`,
      });
    } catch (error) {
      console.error('Error logging download:', error);
    }

    // Remove the link after triggering the download
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {isLoading ? (
          <InAppLoader isLoadingText="Fetching materials" />
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Title
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Course
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
              {materials.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-gray-500">
                    No materials available.
                  </td>
                </tr>
              ) : (
                materials.map((packageItem, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.title}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem?.course?.title}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {formatDate(packageItem.created_at)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        {/* <button
                          onClick={() => openModal(packageItem?.file, packageItem?.id)} // Pass correct URI
                          className="hover:text-primary"
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z" />
                            <path d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z" />
                          </svg>
                        </button> */}
                        {/* Handle download */}
                        <button
                          onClick={() => handleDownload(packageItem)}
                          className="hover:text-primary"
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z" />
                            <path d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {isModalOpen && selectedDoc && (
          <div className="fixed top-0 inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-9999">
            <div
              ref={modalRef}
              className="bg-white rounded-lg shadow-lg w-full sm:w-3/4 max-w-3xl p-4 relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              {/* Document viewer */}
              <DocViewer className="w-full" documents={[{ uri: selectedDoc }]} pluginRenderers={DocViewerRenderers} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMaterialTable;
