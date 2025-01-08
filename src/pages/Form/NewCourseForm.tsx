import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { AuthContext } from '../../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

const NewCourseForm = () => {
  const { fetchWithAuth,displayNotification } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [tutors, setTutors] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    units: '',
    description: '',
    instructor: ''
  });

  useEffect(() => {
    async function fetchTutors() {
      try {
        setIsLoading(true);
        const data = await fetchWithAuth({
          method: 'GET',
          path: '/users_without_courses',
        });
        setTutors(data?.data || []);
      } catch (error) {
        console.error('Error fetching tutors:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTutors();
  }, [fetchWithAuth]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form default submission

    // Check if all required fields are filled
    if (!formData.title) {
      displayNotification('error','Title is required')
      return
    }
    if (!formData.code) {
      displayNotification('error','Code is required')
      return
    }
    if (!formData.units) {
      displayNotification('error','Units are required')
      return
    }
    // if (!formData.instructor) {
    //   displayNotification('error','Instructor is required')
    //   return
    // }

    // Proceed with form submission if all fields are valid
    setIsLoading(true);
    try {
      const data = await fetchWithAuth({
        method: 'POST',
        path: '/management/courses',
        body: formData,
      });
      console.log(data);
      navigate('/course-management/list');
    } catch (error) {
      console.error('Error submitting course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="New Course" />

      <div className="grid grid-cols-1 gap-9 max-w-xl mx-auto">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">New Course</h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-6.5">
              {/* Title Input */}
              <div>
                <label className="mb-3 block text-black dark:text-white">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Course Title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Code Input */}
              <div>
                <label className="mb-3 block text-black dark:text-white">Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="Course Code"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Units Dropdown */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Units</label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    value={formData.units}
                    onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="" disabled className="text-body dark:text-bodydark">
                      Select course units
                    </option>
                    <option value="1" className="text-body dark:text-bodydark">1</option>
                    <option value="2" className="text-body dark:text-bodydark">2</option>
                    <option value="3" className="text-body dark:text-bodydark">3</option>
                  </select>
                </div>
              </div>

              {/* Instructor Dropdown */}
              {/* <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Instructor</label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="" disabled className="text-body dark:text-bodydark">
                      Select instructor
                    </option>
                    {tutors?.map((tutor) => (
                      <option key={tutor.id} value={tutor.id} className="text-body dark:text-bodydark">
                        {tutor.email}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}

              {/* Buttons */}
              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="button"
                  disabled={isLoading}
                  onClick={() => navigate("/course-management/list")}
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

export default NewCourseForm;
