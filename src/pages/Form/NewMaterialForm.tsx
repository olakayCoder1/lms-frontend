import { useContext, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { AuthContext } from '../../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

const NewMaterialForm = () => {

  const {fetchWithAuth,authToken,BACKEND_URL,displayNotification,authUser} = useContext(AuthContext)

  const [title, setTitle] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [ isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Handle option change
  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    setIsOptionSelected(true);
  };


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Basic form validation
    if (!title || !file || !selectedOption) {
        setFormError('All fields are required');
        return;
    }

    // Prepare form data for file upload
    const formData = new FormData();
    formData.append('title', title);

    if (file) {
        formData.append('file', file);  // Ensure file is appended correctly
    } else {
        console.log('No file selected');
    }

    formData.append('status', "publish");

    formData.append('course', selectedOption);

    // Log formData content by iterating through its entries
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    // Authorization headers
    const headers = {
        'Authorization': `Bearer ${authToken?.access}`
    };
    console.log('Headers:', headers);
    setIsLoading(true)

    try {
        // Send the FormData via a POST request
        const response = await fetch(`${BACKEND_URL}/contents/materials/new`, {
            method: 'POST',
            body: formData,
            headers: headers, 
        });

        // Check if the request was successful (status code 200-299)
        if (response.ok) {
            // If successful, parse and process the response as needed
            const responseData = await response.json();
            setTitle('');
            setFile(null);
            setSelectedOption('');
            displayNotification('success',responseData?.detail)
            setIsLoading(false)
            // Optionally handle success, e.g., show a success message
        } else {
            // Handle errors (status code >= 400)
            if (response.headers.get('Content-Type')?.includes('application/json')) {
                // If the response is JSON, parse it
                const errorData = await response.json();
                displayNotification('error',errorData?.detail)
                setIsLoading(false)
            } else {
                // Handle other response formats (e.g., plain text or HTML)
                displayNotification('error','An unexpected error occurred')
                setIsLoading(false)
            }
        }
    } catch (error) {
        // Handle any network errors or unexpected issues
        console.error('Request failed', error);
        setFormError('Network error occurred');
    }
}


  return (
    <>
      <Breadcrumb pageName="New Content" />

      <div className="grid grid-cols-1 gap-9 max-w-xl mx-auto">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                New Material
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-6.5">
              {/* Title Input */}
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Material Title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              {/* Material Status (Dropdown) */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Course
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      isOptionSelected ? 'text-black dark:text-white' : ''
                    }`}
                  >
                    <option value="" disabled className="text-body dark:text-bodydark">
                      Select course status
                    </option>
                    {authUser?.courses.map((option) => (
                      <option value={option.id} key={option.id} className="text-body dark:text-bodydark">
                        {option?.title}
                      </option>
                    ))
                    }
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4.5">
                <button
                
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setTitle('');
                    setFile(null);
                    setSelectedOption('');
                    navigate("/material-management/list")

                  }}
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (<>Processing...</>):(<>Save</>)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewMaterialForm;
