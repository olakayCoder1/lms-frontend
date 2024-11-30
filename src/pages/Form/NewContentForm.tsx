// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import SwitcherOne from '../../components/Switchers/SwitcherOne';
// import MultiSelect from '../../components/Forms/MultiSelect';

// const NewContentForm = () => {
//   return (
//     <>
//       <Breadcrumb pageName="New Content" />

//       <div className="grid grid-cols-1 gap-9 max-w-xl mx-auto">
//         <div className="flex flex-col gap-9">
//           {/* <!-- Input Fields --> */}
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <h3 className="font-medium text-black dark:text-white">
//                 New Content
//               </h3>
//             </div>
//             <div className="flex flex-col gap-5.5 p-6.5">
//               <div>
//                 <label className="mb-3 block text-black dark:text-white">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Content Title"
//                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 />
//               </div>
//               <div>
//                 <label className="mb-3 block text-black dark:text-white">
//                   Description
//                 </label>
//                 <textarea
//                   rows={6}
//                   placeholder="Content Description "
//                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 ></textarea>
//               </div>

//               <SwitcherOne />

              // <div>
              //   <label className="mb-3 block text-black dark:text-white">
              //     Attach file
              //   </label>
              //   <input
              //     type="file"
              //     className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              //   />
              // </div>

//               <MultiSelect id="multiSelect" />

//               <div className="flex justify-end gap-4.5">
//                   <button
//                     className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
//                     type="submit"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
//                     type="submit"
//                   >
//                     Save
//                   </button>
//                 </div>

//             </div>
//           </div>
//         </div>

//       </div>
//     </>
//   );
// };

// export default NewContentForm;




// import React, { useContext, useState } from 'react';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import SwitcherOne from '../../components/Switchers/SwitcherOne';
// import MultiSelect from '../../components/Forms/MultiSelect';
// import { AuthContext } from '../../contexts/ContextProvider';

// const NewContentForm = () => {
//   const [title, setTitle] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [file, setFile] = useState<File | null>(null);
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const [uploading, setUploading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string>('');
//   const {fetchWithAuth,BACKEND_URL} = useContext(AuthContext)
  
//   // Handle file input change
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//       setErrorMessage(''); // Clear any previous error
//     }
//   };

//   // Function to handle video upload and track progress
//   const handleUpload = async () => {
//     if (!file) {
//       setErrorMessage('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     setUploading(true);
//     setUploadProgress(0);
    
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', `${BACKEND_URL}/contents/video-upload/`, true);

//     // Track progress
//     xhr.upload.onprogress = (event) => {
//       if (event.lengthComputable) {
//         const progress = (event.loaded / event.total) * 100;
//         setUploadProgress(progress);
//       }
//     };

//     // Handle response from upload
//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         const response = JSON.parse(xhr.responseText);
//         setVideoUrl(response.file_url); // Assuming the server responds with file URL
//         setUploading(false);
//       } else {
//         setErrorMessage('Upload failed. Please try again.');
//         setUploading(false);
//       }
//     };

//     // Handle errors
//     xhr.onerror = () => {
//       setErrorMessage('An error occurred during the upload. Please try again.');
//       setUploading(false);
//     };

//     // Send the file
//     xhr.send(formData);
//   };

//   // Function to handle the final form submission
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
    
//     if (!title || !description || !file) {
//       setErrorMessage('All fields are required.');
//       return;
//     }

//     handleUpload()

//     if (!videoUrl) {
//       setErrorMessage('Video upload is required.');
//       return;
//     }

//     const formData = {
//       title,
//       description,
//       videoUrl,
//       // Add other form fields as needed
//     };

//     try {
//       // Final submit request to save the content
//       const response = await fetch('/api/save-content/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         console.log('Content saved successfully:', result);
//         // Optionally redirect or reset form
//       } else {
//         console.error('Error saving content:', result);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <>
//       <Breadcrumb pageName="New Content" />
//       <div className="grid grid-cols-1 gap-9 max-w-xl mx-auto">
//         <div className="flex flex-col gap-9">
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <h3 className="font-medium text-black dark:text-white">New Content</h3>
//             </div>
//             <div className="flex flex-col gap-5.5 p-6.5">
//               <div>
//                 <label className="mb-3 block text-black dark:text-white">Title</label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Content Title"
//                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary"
//                 />
//               </div>
//               <div>
//                 <label className="mb-3 block text-black dark:text-white">Description</label>
//                 <textarea
//                   rows={6}
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Content Description"
//                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary"
//                 ></textarea>
//               </div>

//               <SwitcherOne />

//               <div>
//                 <label className="mb-3 block text-black dark:text-white">Attach file</label>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition"
//                 />
//               </div>

//               {/* <MultiSelect id="multiSelect" /> */}

//               {/* Progress Bar */}
//               {uploading && (
//                 <div className="progress-bar-container">
//                   <div
//                     className="progress-bar"
//                     style={{ width: `${uploadProgress}%` }}
//                   ></div>
//                 </div>
//               )}

//               {/* Error message */}
//               {errorMessage && <div className="error-message">{errorMessage}</div>}

//               <div className="flex justify-end gap-4.5">
//                 <button
//                   className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black"
//                   type="button"
//                   onClick={() => {
//                     setTitle('');
//                     setDescription('');
//                     setFile(null);
//                     setVideoUrl(null);
//                     setErrorMessage('');
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
//                   type="submit"
//                   onClick={handleSubmit}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NewContentForm;




import React, { useContext, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SwitcherOne from '../../components/Switchers/SwitcherOne';
import MultiSelect from '../../components/Forms/MultiSelect';
import { AuthContext } from '../../contexts/ContextProvider';
import ProgressModal from '../../components/ProgressModal';  // Import the ProgressModal component

const NewContentForm = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { fetchWithAuth, authToken,BACKEND_URL ,displayNotification} = useContext(AuthContext);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setErrorMessage(''); // Clear any previous error
    }
  };

  // // Function to handle video upload and track progress
  // const handleUpload = async () => {
  //   if (!file) {
  //     setErrorMessage('Please select a file to upload.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   setUploading(true);
  //   setUploadProgress(0);

  //   const xhr = new XMLHttpRequest();
  //   xhr.open('POST', `${BACKEND_URL}/contents/video-upload/`, true);

  //   // Track progress
  //   xhr.upload.onprogress = (event) => {
  //     if (event.lengthComputable) {
  //       const progress = (event.loaded / event.total) * 100;
  //       setUploadProgress(progress);
  //     }
  //   };

  //   // Handle response from upload
  //   xhr.onload = () => {
  //     if (xhr.status === 200) {
  //       const response = JSON.parse(xhr.responseText);
  //       setVideoUrl(response.file_url); // Assuming the server responds with file URL
  //       setUploading(false);
  //     } else {
  //       displayNotification('error','Upload failed. Please try again.');
  //       setUploading(false);
  //     }
  //   };

  //   // Handle errors
  //   xhr.onerror = () => {
  //     displayNotification('error','An error occurred during the upload. Please try again.');
  //     setUploading(false);
  //   };

  //   // Send the file
  //   xhr.send(formData);
  // };

  const handleUpload = () => {
    return new Promise<void>((resolve, reject) => {
      if (!file) {
        setErrorMessage('Please select a file to upload.');
        reject(new Error('No file selected'));
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      setUploading(true);
      setUploadProgress(0);
  
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${BACKEND_URL}/contents/video-upload/`, true);
      xhr.setRequestHeader('Authorization', `Bearer ${authToken?.access}`);
      // Track progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      };
  
      // Handle response from upload
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setVideoUrl(response.file_url); // Assuming the server responds with file URL
          setUploading(false);  // Upload finished
          resolve(); // Resolve the promise when upload is complete
        } else {
          displayNotification('error','Upload failed. Please try again.');
          setUploading(false);
          reject(new Error('Upload failed'));
        }
      };
  
      // Handle errors
      xhr.onerror = () => {
        displayNotification('error','An error occurred during the upload. Please try again.');
        setUploading(false);  // Set uploading to false on error
        reject(new Error('Upload error'));
      };
  
      // Send the file
      xhr.send(formData);
    });
  };
  

  // // Function to handle the final form submission
  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  
  //   // Check for required fields
  //   if (!title || !description || !file) {
  //     displayNotification('error','All fields are required.');
  //     return;
  //   }
  
  //   // Handle video upload before submitting the form
  //   await handleUpload();  // Ensure upload completes before proceeding
  
  //   // Check if the upload is complete
  //   if (uploading) {
  //     displayNotification('error','Please wait for the video upload to complete.');
  //     return;
  //   }
  
  //   // Check if the video URL is available
  //   if (!videoUrl) {
  //     displayNotification('error','Video upload is required.');
  //     return;
  //   }
  
  //   // Prepare the data for submission
  //   const formData = {
  //     title,
  //     description,
  //     videoUrl,
  //   };
  
  //   try {
  //     // Submit the form data after upload completes
  //     const response = await fetch(`${BACKEND_URL}/api/save-content/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  
  //     const result = await response.json();
  //     if (response.ok) {
  //       console.log('Content saved successfully:', result);
  //       // Optionally redirect or reset form
  //     } else {
  //       console.error('Error saving content:', result);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    // Check for required fields
    if (!title || !description || !file) {
      displayNotification('error','All fields are required.');
      return;
    }
  
    // Wait for upload to finish before submitting the form
    try {
      await handleUpload();  // This will wait until the upload is finished
  
      // Check if the video URL is available after the upload
      if (!videoUrl) {
        displayNotification('error','Video upload is required.');
        return;
      }
  
      // Proceed with form submission only after the upload is done
      const formData = {
        title,
        description,
        video_url:videoUrl,
        is_published:enabled
      };
  
      const response = await fetch(`${BACKEND_URL}/contents/save-content/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken?.access}`,
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Content saved successfully:', result);
        // Optionally reset form or redirect
      } else {
        console.error('Error saving content:', result);
      }
    } catch (error) {
      // Handle any errors that happened during the upload
      console.error('Error during upload or form submission:', error);
      displayNotification('error','There was an error. Please try again.');
    }
  };
  

  return (
    <>
      <Breadcrumb pageName="New Content" />
      <div className="grid grid-cols-1 gap-9 max-w-xl mx-auto">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">New Content</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Content Title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">Description</label>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Content Description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary"
                ></textarea>
              </div>

              <div>
              <label
                htmlFor="toggle1"
                className="flex cursor-pointer select-none items-center"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="toggle1"
                    checked={enabled}
                    className="sr-only"
                    onChange={() => {
                      setEnabled(!enabled);
                    }}
                  />
                  <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                  <div
                    className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                      enabled && '!right-1 !translate-x-full !bg-primary dark:!bg-white'
                    }`}
                  ></div>
                </div>
              </label>
            </div>

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

              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black"
                  type="button"
                  onClick={() => {
                    setTitle('');
                    setDescription('');
                    setFile(null);
                    setVideoUrl(null);
                    setErrorMessage('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={uploading}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display the Progress Modal */}
      <ProgressModal
        progress={uploadProgress}
        isUploading={uploading}
        onClose={() => setUploading(false)}
      />
    </>
  );
};

export default NewContentForm;
