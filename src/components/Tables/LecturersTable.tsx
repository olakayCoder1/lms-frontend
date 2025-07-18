import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/ContextProvider';
import InAppLoader from '../InAppLoader';


const LecturersTable = () => {

  const navigate = useNavigate();
  const {fetchWithAuth} = useContext(AuthContext)
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');


  async function fetchStudents() {
    setIsLoading(true)
    let url = '/lecturers/'; 

    // If there's a search query, add it to the URL as a query parameter
    if (searchQuery) {
      url = `/lecturers/?search=${encodeURIComponent(searchQuery)}`;
    }
    try {
        const data = await fetchWithAuth({
        method: 'GET',
        path: url,
        });
        console.log(data)
        setStudents(data?.data);
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
    fetchStudents();
  }, [])

  const formatDate = (created_at) => {
    const formattedDate = new Date(created_at).toLocaleString('en-US', {
      year: 'numeric',  // "2024"
      month: 'long',  // "November"
      day: 'numeric',  // "24"
    });
  
    return formattedDate
  }


  
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
    console.log(searchQuery)
    fetchStudents();
    navigate(`?search=${searchQuery}`, { replace: true });
  }

  
  


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


      <div className="">
      {/* <div className="max-w-full overflow-x-auto"> */}
      {isLoading ? (
        <InAppLoader isLoadingText="Fetching students..."/>
      ): (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Joined date
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
            {/* check if student list is empty */}
            {students.length === 0 ? (
              <>
              <tr>
                <td colSpan="4" className=' text-center py-8'>No records found</td>
              </tr>
              </>
            ):(
              <>
                {students.map((student, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {student?.first_name} {student?.last_name}
                      </h5>
                      {/* <p className="text-sm">${packageItem.price}</p> */}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {formatDate(student.created_at)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          student.is_active
                            ? 'bg-success text-success'
                            : 'bg-danger text-danger'
                        }`}
                      >
                        {student.is_active ? "Active" : "In-active"}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={()=> navigate(`/students/${student.id}`)} className="hover:text-primary">
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
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )
          }
          </tbody>
        </table>
      )}
      </div>
      
    </div>
  );
};

export default LecturersTable;
