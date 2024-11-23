// import { useState,useEffect, useContext } from "react";
// import {
//     StreamVideoClient,
//     StreamVideo,
//     User,
//     StreamCall,
//   } from "@stream-io/video-react-sdk";
// import { ParticipantView, useCallStateHooks } from '@stream-io/video-react-sdk'; 
// import { AuthContext } from "../contexts/ContextProvider";
  
// const apiKey = "mmhfdzb5evj2";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1phbV9XZXNlbGwiLCJ1c2VyX2lkIjoiWmFtX1dlc2VsbCIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzMyMTk3MTIwLCJleHAiOjE3MzI4MDE5MjB9.dr15ONESChMPpAOU-tSArE56DglmyuV79b7i-CNS6FI";
// const userId = "Zam_Wesell";
// const callId = "R8CZ7WlWeG0M";

// const user: User = { id: userId, name: "Tutorial" };
// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call("livestream", callId);
// call.join({ create: true });

// export default function LivestreamViewSession() {

// return (
//     <StreamVideo client={client}>
//     <StreamCall call={call}>
//         <LivestreamView />
//     </StreamCall>
//     </StreamVideo>
// );
// }


// // ... the rest of the code

// const LivestreamView = () => {
//   const {
//     useCameraState,
//     useMicrophoneState,
//     useParticipantCount,
//     useIsCallLive,
//     useParticipants,
//   } = useCallStateHooks();

//   const { authUser } = useContext(AuthContext)

//   // get user role to determine what to display if authUser?.role === 'tutor' 
//   // user can go live else user can only view live
//   // 

//   const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
//   const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();
  
//   const participantCount = useParticipantCount();
//   const isLive = useIsCallLive();

//   const [firstParticipant] = useParticipants();
//   const [isHost, setIsHost] = useState(false);

//   useEffect(() => {
//     if (firstParticipant && firstParticipant.id === userId) {
//       setIsHost(true);
//     }
//   }, [firstParticipant]);

//   // Function to leave the stream
//   const handleLeaveStream = () => {
//     call.leave(); // Leave the stream if the participant is not the host
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: 'column', gap: '4px' }}>
//       <div>{isLive ? `Live: ${participantCount}`: `In Backstage`}</div>
//       {firstParticipant ? (
//         <ParticipantView participant={firstParticipant} />
//       ) : (
//         <div>The host hasn't joined yet</div>
//       )}

//       {/* If not the first participant (host), show leave stream button */}
//       {!isHost && (
//         <div>
//           <button onClick={handleLeaveStream}>Leave Stream</button>
//         </div>
//       )}

//       <div style={{ display: 'flex', gap: '4px'}}>
//         <button onClick={() => (isLive ? call.stopLive() : call.goLive())}>
//           {isLive ? "Stop Live" : "Go Live"}
//         </button>
//         <button onClick={() => cam.toggle()}>
//           {isCamEnabled ? "Disable camera" : "Enable camera"}
//         </button>
//         <button onClick={() => mic.toggle()}>
//           {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
//         </button>
//       </div>
//     </div>
//   );
// };


// import { useState, useEffect, useContext } from "react";
// import {
//   StreamVideoClient,
//   StreamVideo,
//   User,
//   StreamCall,
// } from "@stream-io/video-react-sdk";
// import { ParticipantView, useCallStateHooks } from '@stream-io/video-react-sdk';
// import { AuthContext } from "../contexts/ContextProvider";

// // API setup
// const apiKey = "mmhfdzb5evj2";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1phbV9XZXNlbGwiLCJ1c2VyX2lkIjoiWmFtX1dlc2VsbCIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzMyMTk3MTIwLCJleHAiOjE3MzI4MDE5MjB9.dr15ONESChMPpAOU-tSArE56DglmyuV79b7i-CNS6FI";
// const userId = "Zam_Wesell";
// const callId = "R8CZ7WlWeG0M";

// // Create user and client instances
// const user: User = { id: userId, name: "Tutorial" };
// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call("livestream", callId);

// export default function LivestreamViewSession() {
//   useEffect(() => {
//     // Join the stream call asynchronously
//     const joinCall = async () => {
//       try {
//         await call.join({ create: true });
//       } catch (error) {
//         console.error("Error joining the call", error);
//       }
//     };

//     joinCall();

//     // Clean up when the component unmounts
//     return () => {
//       if (call) call.leave();
//     };
//   }, [call]);

//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <LivestreamView />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

// // Livestream view component
// const LivestreamView = () => {
//   const {
//     useCameraState,
//     useMicrophoneState,
//     useParticipantCount,
//     useIsCallLive,
//     useParticipants,
//   } = useCallStateHooks();

//   const { authUser } = useContext(AuthContext);  

//   console.log(authUser)

//   const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
//   const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();
  
//   const participantCount = useParticipantCount();
//   const isLive = useIsCallLive();
  
//   const [firstParticipant] = useParticipants();
//   const [isHost, setIsHost] = useState(false);

//   useEffect(() => {
//     if (firstParticipant && firstParticipant.id === userId) {
//       setIsHost(true); // Set the current user as the host if they are the first to join
//     }
//   }, [firstParticipant]);

//   // Function to leave the stream
//   const handleLeaveStream = () => {
//     call.leave(); // Leave the stream if the participant is not the host
//   };

//   // Function to toggle live stream (Go live or stop live)
//   const toggleLiveStream = () => {
//     if (isLive) {
//       call.stopLive(); // Stop the live stream if currently live
//     } else {
//       call.goLive();  // Start the live stream if it's not live
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: 'column', gap: '4px' }}>
//       {authUser?.role === "tutor" && (<div>{isLive ? `Live: ${participantCount}` : `In Backstage`}</div>) }
//       {firstParticipant ? (
//         <ParticipantView participant={firstParticipant} />
//       ) : (
//         <div>The tutor hasn't joined yet {authUser?.role}</div>
//       )}

//       {/* Show control buttons only if the user is a tutor */}
//       {authUser?.role === "tutor" ? (
//         <>
//           {/* If the user is the tutor, they can start/stop the live session */}
//           <div style={{ display: 'flex', gap: '4px' }}>
//             <button onClick={toggleLiveStream}>
//               {isLive ? "Stop Live" : "Go Live"}
//             </button>

//             {/* Toggle Camera */}
//             <button onClick={() => cam.toggle()}>
//               {isCamEnabled ? "Disable Camera" : "Enable Camera"}
//             </button>
            
//             {/* Toggle Microphone */}
//             <button onClick={() => mic.toggle()}>
//               {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
//             </button>
//           </div>
//         </>
//       ) : (
//         // If the user is not a tutor, they cannot control the stream
//         <div style={{ marginTop: "10px" }}>
          
//         </div>
//       )}

//       {/* If the user is not the host, show the leave stream button */}
//       {!isHost && authUser?.role !== "tutor" && firstParticipant &&  (
//         <div>
//           <button 
//             onClick={handleLeaveStream} 
//             className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
//             Leave Stream
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };



import { useState, useEffect, useContext } from "react";
import {
  StreamVideoClient,
  StreamVideo,
  User,
  StreamCall,
} from "@stream-io/video-react-sdk";
import { ParticipantView, useCallStateHooks } from '@stream-io/video-react-sdk';
import { AuthContext } from "../contexts/ContextProvider";

// API setup
const apiKey = "mmhfdzb5evj2";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1phbV9XZXNlbGwiLCJ1c2VyX2lkIjoiWmFtX1dlc2VsbCIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzMyMTk3MTIwLCJleHAiOjE3MzI4MDE5MjB9.dr15ONESChMPpAOU-tSArE56DglmyuV79b7i-CNS6FI";
const userId = "Zam_Wesell";
const callId = "R8CZ7WlWeG0M";

// Create user and client instances
const user: User = { id: userId, name: "Tutorial" };
const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("livestream", callId);

export default function LivestreamViewSession() {
  const { authUser } = useContext(AuthContext);

  if (!authUser) {
    // Handle case where authUser is not available (i.e., user is not logged in)
    return <div>Loading...</div>;
  }

  // Create Stream Video client and call instance
  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call("livestream", callId);

  // useEffect(() => {
  //   // Join the stream call asynchronously
  //   const joinCall = async () => {
  //     try {
  //       await call.join({ create: true });
  //     } catch (error) {
  //       console.error("Error joining the call", error);
  //     }
  //   };

  //   joinCall();

  //   // Clean up when the component unmounts
  //   return () => {
  //     if (call) call.leave();
  //   };
  // }, [call]);

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LivestreamView />
      </StreamCall>
    </StreamVideo>
  );
}

// Livestream view component
const LivestreamView = ({ hasJoined, joinCall, leaveCall }: any) => {
  const {
    useCameraState,
    useMicrophoneState,
    useParticipantCount,
    useIsCallLive,
    useParticipants,
  } = useCallStateHooks();

  const { authUser } = useContext(AuthContext);  

  const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
  const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();
  
  const participantCount = useParticipantCount();
  const isLive = useIsCallLive();
  
  const [firstParticipant] = useParticipants();
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (firstParticipant && firstParticipant.id === userId) {
      setIsHost(true); // Set the current user as the host if they are the first to join
    }
  }, [firstParticipant]);

  // Function to toggle live stream (Go live or stop live)
  const toggleLiveStream = () => {
    if (isLive) {
      call.stopLive(); // Stop the live stream if currently live
    } else {
      call.goLive();  // Start the live stream if it's not live
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: 'column', gap: '4px' }}>
      {authUser?.role === "tutor" && <div>{isLive ? `Live: ${participantCount}` : `In Backstage`}</div>}

      {firstParticipant ? (
        <ParticipantView participant={firstParticipant} />
      ) : (
        <div>The tutor hasn't joined yet {authUser?.role}</div>
      )}

      {/* Tutor-specific controls */}
      {authUser?.role === "tutor" ? (
        <>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={toggleLiveStream}>
              {isLive ? "Stop Live" : "Go Live"}
            </button>

            {/* Toggle Camera */}

            {isCamEnabled ? (
              <button onClick={() => cam.toggle()} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Disable Camera</button>
            ):(
              <button onClick={() => mic.toggle()} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Enable Camera</button>
            )}
            {isMicEnabled ? (
              <button onClick={() => mic.toggle()} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Mute Mic</button>
            ):(
              <button onClick={() => mic.toggle()} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Unmute Mic</button>
            )}
          </div>
        </>
      ) : (
        // Non-Tutor (Viewer) controls
        <div style={{ marginTop: "10px" }}>
          {!hasJoined ? (
            <button 
              onClick={joinCall}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Join Stream
            </button>
          ) : (
            <div>
              <p>You are watching the live stream.</p>
              <button 
                onClick={leaveCall}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Leave Stream
              </button>
            </div>
          )}
        </div>
      )}

      {/* If the user is not the host, show the leave stream button */}
      {!isHost && authUser?.role !== "tutor" && firstParticipant && (
        <div>
          <button 
            onClick={leaveCall} 
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
            Leave Stream
          </button>
        </div>
      )}
    </div>
  );
};
