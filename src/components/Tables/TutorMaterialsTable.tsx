// disable typing
// @ts-nocheck
import { useContext, useEffect, useRef, useState } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Package } from '../../types/package';
import { AuthContext } from '../../contexts/ContextProvider';
import InAppLoader from '../InAppLoader';
import { useNavigate } from 'react-router-dom';

const TutorMaterialsTable = () => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {fetchWithAuth,formatDate,displayNotification} = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const [materialToDelete, setMaterialToDelete] = useState(null); // Store the ID of the quiz to be deleted

  const [materials, setMaterials] = useState([])

  const docs = [
    { uri: 'https://pdfobject.com/pdf/sample.pdf' }, // Remote file
    // Add other document URLs here as needed
  ];

  const openModal = (docUri: string) => {
    setSelectedDoc(docUri);
    setIsModalOpen(true);
  };



  const closeModal = () => setIsModalOpen(false);


  async function fetchMaterials() {
    let url = '/contents/materials/'; 

    // If there's a search query, add it to the URL as a query parameter
    if (searchQuery) {
      url = `/contents/materials/?search=${encodeURIComponent(searchQuery)}`;
    }
    try {
        setIsLoading(true)
        const data = await fetchWithAuth({
        method: 'GET',
        path: url,
        });
        // console.log(data)
        setMaterials(data?.data);
        setIsLoading(false)
    } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false)
    }

}

  useEffect(() => {
    const params = new URLSearchParams(location.search); 
    const searchParam = params.get('search'); 
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    fetchMaterials();
  }, [])

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


  // Handle search input change
  const handleSearchParamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Update the URL search query without reloading the page
    const params = new URLSearchParams(location.search);
    params.set('search', query); // Update 'search' query param

    // Update the URL using window.history.pushState
    window.history.pushState(
      {},
      '',
      `${location.pathname}?${params.toString()}`
    );
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchMaterials();
    navigate(`?search=${searchQuery}`, { replace: true });
  }


  // Function to handle the delete action
  const handleDelete = async () => {
    if (!materialToDelete) return;

    try {
      await fetchWithAuth({
        method: 'DELETE',
        path: `/contents/material/${materialToDelete}`,
      });
      // Filter out the deleted quiz from the state
      setMaterials((prevQuizzes) => prevQuizzes.filter((material) => material.id !== materialToDelete));
      displayNotification('success', 'Material deleted successfully!');
      setShowModal(false);
      navigate('/material-management/list')
      
    } catch (error) {
      console.error('Error deleting quiz:', error);
      displayNotification('error', 'Failed to delete quiz');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="hidden sm:block pb-8">
          <form onSubmit={handleSearch}>
              <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                  <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                      fill=""
                  />
                  <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                      fill=""
                  />
                  </svg>
              </button>

              <input
                  type="text"
                  name="search"
                  value={searchQuery}
                  onChange={handleSearchParamChange}
                  placeholder="Type to search..."
                  className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
              />
              </div>
          </form>
      </div>
      <div className="max-w-full overflow-x-auto">
        {
          isLoading ? (
            <InAppLoader isLoadingText="Fetching materials" />
          ):(
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Created
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {materials?.length === 0 ? (
                  <>
                    <tr>
                      <td colSpan="4" className=' text-center py-8'>No records found</td>
                    </tr>
                  </>
                ):(
                  <>
                    {materials?.map((packageItem, key) => (
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
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          packageItem.status === 'publish'
                            ? 'bg-success text-success'
                            : 'bg-warning text-warning'
                        }`}
                      >
                        {packageItem.status}
                      </p>
                      {/* <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-mediumbg-success text-success`}
                      >
                        Active
                      </p> */}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button onClick={() => openModal(docs[0].uri)} className="hover:text-primary">
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
                        <button
                          onClick={() => {
                            setMaterialToDelete(packageItem.id); 
                            setShowModal(true); 
                          }}
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
                              d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                              fill=""
                            />
                            <path
                              d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                              fill=""
                            />
                            <path
                              d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                              fill=""
                            />
                            <path
                              d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                              fill=""
                            />
                          </svg>
                        </button>
                        {/* <button className="hover:text-primary">
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
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
                  </>
                )}
                
              </tbody>
            </table>
          )
        }
        

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
        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
              <h3 className="text-lg font-medium text-black">Are you sure you want to delete this material?</h3>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="py-2 px-4 bg-gray-300 text-black rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="py-2 px-4 bg-red-500 text-white rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorMaterialsTable;
