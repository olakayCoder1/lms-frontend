import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/ContextProvider';
import InAppLoader from './InAppLoader';

export default function CourseRegistration() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchWithAuth,displayNotification,setAuthUser } = useContext(AuthContext);

  const [materials, setMaterials] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [submitMessage, setSubmitMessage] = useState(""); // Feedback message

  // Fetch materials from the backend
  async function fetchMaterials() {
    let url = '/account/course/registration';
    try {
      setIsLoading(true);
      const data = await fetchWithAuth({
        method: 'GET',
        path: url,
      });
      setMaterials(data?.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching course materials:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Handle checkbox selection
  const handleCheckboxChange = (courseCode) => {
    setSelectedCourses((prevSelected) => ({
      ...prevSelected,
      [courseCode]: !prevSelected[courseCode],
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Extract the selected course codes
    const selectedCourseCodes = Object.keys(selectedCourses).filter(
      (courseCode) => selectedCourses[courseCode]
    );

    if (selectedCourseCodes.length === 0) {
      displayNotification('error',"Please select at least one course.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(""); // Reset any previous messages

    console.log(selectedCourseCodes)

    try {
      // Replace with the appropriate URL or API endpoint for submitting selected courses
      const response = await fetchWithAuth({
        method: 'POST',
        path: '/account/course/registration', // Change this to the correct endpoint
        body: { courses: selectedCourseCodes },
      });
    
      console.log(response)
      if (response?.status === true) {
        console.log(response)
        displayNotification("success",response?.message);

        // update user instance in localstorage
        localStorage.setItem('user', JSON.stringify(response?.data?.user));
        setAuthUser(response?.data?.user)

      } 
    } catch (error) {
      console.error('Error submitting courses:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl overflow-x-auto mx-auto bg-white p-4">
        <h1 className=' text-center font-bold text-lg'>Course Registration</h1>
        {isLoading ? (
          <InAppLoader isLoadingText="Fetching materials" />
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Title
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Code
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Select
                </th>
              </tr>
            </thead>
            <tbody>
              {materials?.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-8">
                    No records found
                  </td>
                </tr>
              ) : (
                materials?.map((packageItem, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.title}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{packageItem.code}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <input
                          type="checkbox"
                          id={packageItem.id}
                          checked={selectedCourses[packageItem.id] || false}
                          onChange={() => handleCheckboxChange(packageItem.id)}
                          className="h-5 w-5"
                        />
                        <label htmlFor={packageItem.id} className="text-black dark:text-white">
                          Select
                        </label>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* Submit Section */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* Feedback message */}
        {submitMessage && (
          <div className="mt-4 text-center text-sm font-medium text-green-500 dark:text-green-400">
            {submitMessage}
          </div>
        )}
      </div>
    </>
  );
}
