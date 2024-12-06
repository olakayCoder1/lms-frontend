import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { AuthContext } from '../../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

const NewLectureForm = () => {
  const { fetchWithAuth,displayNotification } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    course: '',
    first_name:'',
    last_name:'',
    email:''
  });

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true);
        const data = await fetchWithAuth({
          method: 'GET',
          path: '/courses_without_users',
        });
        setCourses(data?.data || []);
      } catch (error) {
        console.error('Error fetching Courses:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, [fetchWithAuth]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form default submission

    // Check if all required fields are filled
    if (!formData.first_name) {
      displayNotification('error','First name is required')
      return
    }
    if (!formData.last_name) {
      displayNotification('error','Last name is required')
      return
    }
    if (!formData.email) {
      displayNotification('error','Email are required')
      return
    }

    // Proceed with form submission if all fields are valid
    setIsLoading(true);
    try {
      const data = await fetchWithAuth({
        method: 'POST',
        path: '/lecturers/new',
        body: formData,
      });
      console.log(data);
      // navigate('/lectures');
      displayNotification('success',data?.message)
      setFormData(
        {
          course: '',
          first_name:'',
          last_name:'',
          email:''
        }
      )
    } catch (error) {
      console.error('Error submitting course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="New Lecturer" />

      <div className="grid grid-cols-1 gap-9 max-w-xl mx-auto">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">New Lecturer</h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-6.5">
              {/* Title Input */}
              <div>
                <label className="mb-3 block text-black dark:text-white">First Name</label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  placeholder="First Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">Last Name</label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  placeholder="Last Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>


              {/* Instructor Dropdown */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Course</label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="" disabled className="text-body dark:text-bodydark">
                      Select course
                    </option>
                    {courses?.map((course) => (
                      <option key={course.id} value={course.id} className="text-body dark:text-bodydark">
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="button"
                  disabled={isLoading}
                  onClick={() => navigate("/lecturers/list")}
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewLectureForm;
