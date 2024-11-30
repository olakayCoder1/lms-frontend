import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SwitcherOne from '../../components/Switchers/SwitcherOne';
import MultiSelect from '../../components/Forms/MultiSelect';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/ContextProvider';
import { useParams } from 'react-router-dom';

const UpdateContentForm = () => {


  const {fetchWithAuth} = useContext(AuthContext)
    const [video, setVideo] = useState({})
    // get the user id from param
    const { id } = useParams();

    useEffect(() => {
        async function fetchVideo() {
            try {
                const data = await fetchWithAuth({
                method: 'GET',
                path: `/contents/video/${id}`,
                });
                console.log(data)
                setVideo(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
  
        }
        fetchVideo();
    }, [])



  return (
    <>
      <Breadcrumb pageName="Content" />

      <div className="grid grid-cols-1 gap-9 max-w-xl mx-auto">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Update Content
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  value={video?.title}
                  placeholder="Content Title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  rows={6}
                  value={video?.description}
                  placeholder="Content Description "
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              {/* <SwitcherOne /> */}

              <div>
                <label
                  htmlFor="toggle1"
                  className="flex cursor-pointer select-none items-center"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="toggle1"
                      className="sr-only"
                      // onChange={() => {
                      //   setEnabled(!enabled);
                      // }}
                      onChange={(e)=> { setVideo({...video, is_published: e.target.checked})}}

                    />
                    <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                    <div
                      className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                        video?.is_published && '!right-1 !translate-x-full !bg-primary dark:!bg-white'
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
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              {/* <MultiSelect id="multiSelect" /> */}

            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default UpdateContentForm;
