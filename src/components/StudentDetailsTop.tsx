import CoverOne from '../images/cover/cover-01.png';

export default function StudentDetailsTop({student}) {
    

    return (
        <>
            <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src="https://avatars.githubusercontent.com/u/95700260?s=400&u=8a038fc4fa00588887195b84026eb610c9213b4f&v=4" className="rounded-full" alt="profile" />
          
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {student?.first_name} {student?.last_name}
            </h3>
            <p className="font-medium">{student?.email}</p>
          </div>
        </div>
      </div>
        </>
    )
}
