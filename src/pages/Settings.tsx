import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { AuthContext } from '../contexts/ContextProvider';
import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-06.png';


const Settings = () => {


  const { fetchWithAuth,authToken,displayNotification ,setAuthUser,BACKEND_URL} = useContext(AuthContext)
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isPasswordProcessing, setIsPasswordProcessing] = useState<boolean>(false);
  const [isProfileProcessing, setIsProfileProcessing] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<any>(userSix);
  const [userDetails,setUserDetails] = useState({})
  const [passwordData,setPasswordData] = useState({
    oldPassword:'',
    newPassword:'',
    confirmPassword:''
  })


  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProfileProcessing(true)
    try {
          const data = await fetchWithAuth({
          method: 'PUT',
          path: `/account/`,
          body: userDetails
          });
          console.log(data)
          setUserDetails(data?.data);
          localStorage.setItem('user', JSON.stringify(data?.data));
          setAuthUser(data?.data)
          setIsProfileProcessing(false)
    } catch (error) {
          console.error('Error fetching user profile:', error);
          setIsProfileProcessing(false)
      }
  }

  const updatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // valiade oldPassword not empty
    if(passwordData.oldPassword.trim() === '') {
      displayNotification('error','Old password is required')
      return
      }
    // validate new password not empty
    if(passwordData.newPassword.trim() === '') {
      displayNotification('error','New password is required')
      return
    }
    // validate confirm password not empty
    if(passwordData.confirmPassword.trim() === '') {
      displayNotification('error','Confirm password is required')
      return
    }
    setIsPasswordProcessing(true)
    try {
        const data = await fetchWithAuth({
        method: 'POST',
        path: `/account/reset-password`,
        body: passwordData
        });

        displayNotification('success',data?.detail)
        // set state
        setPasswordData({
          oldPassword:'',
          newPassword:'',
          confirmPassword:''
        })
        setIsPasswordProcessing(false)
    } catch (error) {
        setIsPasswordProcessing(false)
        console.error('Error fetching user profile:', error);
    }
  }

  // const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files ? e.target.files[0] : null;
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('profileImage', file);

  //     // Log FormData content (Manually inspect the contents of the FormData)
  //     for (let pair of formData.entries()) {
  //       console.log(pair[0]+ ', ' + pair[1]);
  //     }

  //     try {
  //       // Assume the API for updating the profile image is POST /account/upload-profile-image
  //       const response = await fetchWithAuth({
  //         method: 'POST',
  //         path: '/account/upload-profile-image',
  //         body: formData,
  //         headers: {
  //           'Content-Type': 'multipart/form-data', // Ensure the header is set correctly for file upload
  //         },
  //         isformData : true,
  //       });

  //       if (response?.data) {
  //         const updatedUserDetails = { ...userDetails, profileImage: response?.data?.imageUrl }; // Assuming the API returns an image URL
  //         setUserDetails(updatedUserDetails);
  //         setProfileImage(response?.data?.imageUrl); // Update the profile image displayed
  //         localStorage.setItem('user', JSON.stringify(updatedUserDetails)); // Store updated details in localStorage
  //         setAuthUser(updatedUserDetails); // Update context with new user details
  //         displayNotification('success', 'Profile image updated successfully!');
  //       }
  //     } catch (error) {
  //       console.error('Error uploading profile image:', error);
  //       displayNotification('error', 'Error uploading profile image!');
  //     }
  //   }
  // };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);
  
      try {
        // Assuming the backend endpoint is /api/v1/account/upload-profile-image
        const response = await fetch(`${BACKEND_URL}/account/upload-profile-image`, {
          method: 'POST',
          headers: {
            // Do not set Content-Type manually, as FormData will set it correctly
            'Authorization': `Bearer ${authToken?.access}`, // If authentication is needed
          },
          body: formData, // Sending the formData object which contains the file
        });
  
        // Parse the response to JSON
        const data = await response.json();
  
        if (response.ok) {
          setUserDetails(data?.data);
          localStorage.setItem('user', JSON.stringify(data?.data));
          setAuthUser(data?.data)
          setProfileImage(data?.data?.profile_image);
          displayNotification('success', 'Profile image updated successfully!');
        } else {
          // Handle errors (e.g. if file upload failed)
          displayNotification('error', data.error || 'Error uploading profile image');
        }
      } catch (error) {
        console.error('Error uploading profile image:', error);
        displayNotification('error', 'Error uploading profile image!');
      }
    }
  };
  

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await fetchWithAuth({
          method: 'GET',
          path: `/account`,
        });
        console.log(data?.data);  
        setUserDetails(data?.data);
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchDetails();
  }, []);
  
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="relative z-20 h-35 md:h-65">
              <img
                src={CoverOne}
                alt="profile cover"
                className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              />
             <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
            >
              <input type="file" 
                  name="profile"
                  className="sr-only"
                  accept="image/*" 
                  id="cover" 
                  onChange={handleProfileImageChange}
                />
              <span>
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span>Edit image</span>
            </label>
          </div>
            </div>
            <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
              <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                <div className="relative drop-shadow-2">
                <img
                    src={userDetails?.profile_image}
                    alt="profile"
                    className="rounded-full object-cover w-full h-full"
                  />
                  <label
                    htmlFor="profile"
                    className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                  >
                    <svg
                      className="fill-current"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                        fill=""
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                        fill=""
                      />
                    </svg>
                      <input
                        type="file"
                        name="profile"
                        id="profile"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                      />
                    
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={updateProfile}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          value={userDetails?.first_name || ''}
                          onChange={
                            (e) => {
                              setUserDetails({
                                ...userDetails,
                                first_name: e.target.value
                                })
                                }
                          }
                          name="first_name"
                          id="first_name"
                          placeholder=""
                          defaultValue=""
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          value={userDetails?.last_name || ''}
                          onChange={
                            (e) => {
                              setUserDetails({
                                ...userDetails,
                                last_name: e.target.value
                                })
                              }
                          }
                          name="lastName"
                          id="lastName"
                          placeholder="Devid Jhon"
                          defaultValue="Devid Jhon"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="emailAddress"
                        value={userDetails?.email || ''}
                        disabled={true}
                        id="emailAddress"
                        placeholder="devidjond45@gmail.com"
                        defaultValue="devidjond45@gmail.com"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4.5">
                    {/* <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button> */}
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      disabled={isProfileProcessing}
                    >
                      {isProfileProcessing ? "Processing..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Reset Password
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={updatePassword}>
                <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="oldPassword"
                    >
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type={
                          isChecked ? 'text' : 'password'
                        }
                        value={passwordData?.oldPassword}
                          onChange={
                            (e) => {
                              setPasswordData({
                                ...passwordData,
                                oldPassword: e.target.value
                                })
                                }
                          }
                        name="oldPassword"
                        id="oldPassword"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="newPassword"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type={
                          isChecked ? 'text' : 'password'
                        }
                          value={passwordData?.newPassword}
                          onChange={
                            (e) => {
                              setPasswordData({
                                ...passwordData,
                                newPassword: e.target.value
                                })
                                }
                          }
                          name="newPassword"
                          id="newPassword"
                          placeholder=""
                          defaultValue=""
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="confirmPassword"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                      
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type={
                          isChecked ? 'text' : 'password'
                        }
                          value={passwordData?.confirmPassword}
                          onChange={
                            (e) => {
                              setPasswordData({
                                ...passwordData,
                                confirmPassword: e.target.value
                                })
                              }
                          }
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder=""
                          defaultValue=""
                        />
                      </div>
                    </div>

                  </div>
                  <div>
                  <label
                    htmlFor="checkboxLabelOne"
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="checkboxLabelOne"
                        className="sr-only"
                        onChange={() => {
                          setIsChecked(!isChecked);
                        }}
                      />
                      <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                          isChecked && 'border-primary bg-gray dark:bg-transparent'
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'}`}
                        ></span>
                      </div>
                    </div>
                    View
                  </label>
                </div>

                  
                  
                  <div className="flex justify-end gap-4.5">
                    {/* <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button> */}
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      disabled={isPasswordProcessing}
                    >
                      {isPasswordProcessing ? "Processing..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
