import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/ContextProvider';
import InAppLoader from '../InAppLoader';
import { User, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StudentsListTable = () => {

  const navigate = useNavigate();
  const {fetchWithAuth} = useContext(AuthContext)
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');


  async function fetchStudents() {
    setIsLoading(true)
    let url = '/students'; 

    // If there's a search query, add it to the URL as a query parameter
    if (searchQuery) {
      url = `/students?search=${encodeURIComponent(searchQuery)}`;
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
                Performance
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
                    <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark ">
                      <h5 className="  text-black dark:text-white">
                        <div>
                          <span className="bg-gray-1 text-black rounded-full px-2 py-1">
                          {student?.previous_cgpa} :: {student?.prediction?.prediction}
                          </span>
                          <div>
                          {student?.prediction?.group == 'improving' ? (
                          <>
                          <div className={`flex items-center text-green-600`}>
                            <TrendingUp className={`mr-2 text-green-600`} size={20} />
                            <span className="text-sm font-medium">{student?.prediction?.group }</span>
                          </div>
                          </>
                        ): (
                          student?.prediction?.group == 'declining' ? (
                            <div className={`flex items-center text-yellow-600`}>
                              <TrendingDown className={`mr-2 text-yellow-600`} size={20} />
                            <span className="text-sm font-medium">{student?.prediction?.group}</span>
                            </div>
                          ): (
                            <div className={`flex items-center text-blue-600`}>
                                <Minus className={`mr-2 text-blue-600`} size={20} />
                              <span className="text-sm font-medium">{student?.prediction?.group || 'N/A'}</span>
                            </div>
                          )
                        )}
                          </div>
                        </div>
                        
                        
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
                          onClick={()=> navigate(`/user/${student.id}`)} className="hover:text-primary">
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

export default StudentsListTable;
