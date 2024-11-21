import React from 'react';

// interface TutorialVideoProps {
//   videoUrl: string;
//   title: string;
//   description: string;
//   materials: { title: string; url: string }[]; // Optional materials (e.g., PDF, documents)
// }

interface TutorialVideoProps {
  videoUrl: string;
  title: string;
  description: string;
  materials: { title: string; url: string }[];
  userId: string; // Assume you have a user ID to track their progress
}
const TutorialVideo: React.FC<TutorialVideoProps> = ({ videoUrl, title, description, materials,userId }) => {

    console.log(videoUrl)
    console.log(videoUrl)
    console.log(videoUrl)
    console.log(videoUrl)

  return (
    <div className="max-w-4xl mx-auto p-4 shadow-lg rounded-lg">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

      {/* Video Player */}
      <div className="mt-4">
        <div className="relative pb-[56.25%] overflow-hidden">
          <video
            src={videoUrl}
            controls
            className="absolute top-0 left-0 w-full h-full"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Video Player */}
      {/* <div className="mt-4">
        <div className="relative pb-9/16 overflow-hidden">
          <iframe
            src={videoUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div> */}



      {/* Description */}
      <p className="mt-4 text-gray-600">{description}</p>

      {/* Optional Materials */}
      {materials.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Additional Materials</h3>
          <ul className="mt-2 space-y-2">
            {materials.map((material, index) => (
              <li key={index}>
                <a
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {material.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TutorialVideo;


// import React, { useState, useEffect, useRef } from 'react';

// interface TutorialVideoProps {
//   videoUrl: string;
//   title: string;
//   description: string;
//   materials: { title: string; url: string }[];
//   userId: string; // Assume you have a user ID to track their progress
// }

// const TutorialVideo: React.FC<TutorialVideoProps> = ({ videoUrl, title, description, materials, userId }) => {
//   const [currentTime, setCurrentTime] = useState<number>(0);
//   const [duration, setDuration] = useState<number>(0);
//   const videoRef = useRef<HTMLVideoElement | null>(null); // To hold reference to the video element
//   const intervalRef = useRef<NodeJS.Timeout | null>(null); // To store the interval ID

//   // Function to save video time in localStorage
//   const saveVideoTime = (time: number) => {
//     localStorage.setItem(`videoTime_${userId}`, time.toString());
//   };

//   // Function to load video time from localStorage
//   const loadVideoTime = () => {
//     const savedTime = localStorage.getItem(`videoTime_${userId}`);
//     return savedTime ? parseFloat(savedTime) : 0;
//   };

//   // Handler for time update (triggered when the video plays)
//   const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
//     const videoElement = event.target as HTMLVideoElement;
//     setCurrentTime(videoElement.currentTime); // Update the current time
//   };

//   // Handler when the metadata of the video is loaded
//   const handleLoadedMetadata = (event: React.SyntheticEvent<HTMLVideoElement>) => {
//     const videoElement = event.target as HTMLVideoElement;
//     setDuration(videoElement.duration); // Set the video duration once metadata is loaded
//   };

//   // Function to update the video time every 1 minute
//   useEffect(() => {
//     // Load the saved video time from localStorage when the component mounts
//     const savedTime = loadVideoTime();
//     if (videoRef.current) {
//       // Set the video time only when the video element is available
//       videoRef.current.currentTime = savedTime;
//       setCurrentTime(savedTime);
//     }

//     // Start the interval to update video time every 1 minute
//     if (videoRef.current) {
//       intervalRef.current = setInterval(() => {
//         // Save the current time to localStorage every 1 minute
//         saveVideoTime(currentTime);
//       }, 10000); // 60 seconds (1 minute)

//       // Clear the interval when the video is paused or the component is unmounted
//       return () => {
//         if (intervalRef.current) {
//           clearInterval(intervalRef.current);
//         }
//       };
//     }
//   }, [userId]); // Runs only once when the component mounts (no need to depend on currentTime)

//   // Function to handle video pause (optional)
//   const handlePause = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current); // Clear the interval when the video is paused
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
//       {/* Title */}
//       <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

//       {/* Video Player */}
//       <div className="mt-4">
//         <div className="relative pb-[56.25%] overflow-hidden">
//           <video
//             ref={videoRef}
//             src={videoUrl}
//             controls
//             className="absolute top-0 left-0 w-full h-full"
//             onTimeUpdate={handleTimeUpdate}
//             onLoadedMetadata={handleLoadedMetadata}
//             onPause={handlePause} // Clear interval on pause
//           >
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       </div>

//       {/* Display current time */}
//       <div className="mt-4 text-gray-600">
//         <p>Current Time: {currentTime.toFixed(2)} seconds</p>
//         <p>Duration: {duration.toFixed(2)} seconds</p>
//       </div>

//       {/* Display progress bar */}
//       <div className="mt-4">
//         <div className="w-full bg-gray-200 rounded-full h-2">
//           <div
//             style={{ width: `${(currentTime / duration) * 100}%` }}
//             className="bg-blue-500 h-2 rounded-full"
//           ></div>
//         </div>
//       </div>

//       {/* Description */}
//       <p className="mt-4 text-gray-600">{description}</p>

//       {/* Optional Materials */}
//       {materials.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold text-gray-800">Additional Materials</h3>
//           <ul className="mt-2 space-y-2">
//             {materials.map((material, index) => (
//               <li key={index}>
//                 <a
//                   href={material.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:underline"
//                 >
//                   {material.title}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TutorialVideo;
