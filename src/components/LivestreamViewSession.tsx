import { useState, useEffect, useContext } from "react";
import {
  StreamVideoClient,
  StreamVideo,
  User,
  StreamCall,
} from "@stream-io/video-react-sdk";
import { ParticipantView, useCallStateHooks } from '@stream-io/video-react-sdk';
import { AuthContext } from "../contexts/ContextProvider";

// // API setup
// const apiKey = "mmhfdzb5evj2";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1NlbmF0b3JfQmFpbF9PcmdhbmEiLCJ1c2VyX2lkIjoiU2VuYXRvcl9CYWlsX09yZ2FuYSIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzMyNjQwMTc0LCJleHAiOjE3MzMyNDQ5NzR9.0S0Iz2Raje_KnOa24TTaC89wGUcYp58LVOiewiBoHJA";
// const userId = "Senator_Bail_Organa";
// const callId = "R8CZ7WlWeG0M";

// // Create user and client instances
// const user: User = { id: userId, name: "Tutorial" };
// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call("livestream", callId);

// export default function LivestreamViewSession() {
//   const { authUser } = useContext(AuthContext);

//   if (!authUser) {
//     // Handle case where authUser is not available (i.e., user is not logged in)
//     return <div>Loading...</div>;
//   }

//   // Create Stream Video client and call instance
//   const client = new StreamVideoClient({ apiKey, user, token });
//   const call = client.call("livestream", callId);


//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <LivestreamView />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

// // Livestream view component
// const LivestreamView = ({ hasJoined, joinCall, leaveCall }: any) => {
//   const {
//     useCameraState,
//     useMicrophoneState,
//     useParticipantCount,
//     useIsCallLive,
//     useParticipants,
//   } = useCallStateHooks();

//   const { authUser } = useContext(AuthContext);  

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
//       {authUser?.role === "tutor" && <div>{isLive ? `Live: ${participantCount}` : `In Backstage`}</div>}

//       {firstParticipant ? (
//         <ParticipantView participant={firstParticipant} />
//       ) : (
//         <div>The tutor hasn't joined yet {authUser?.role}</div>
//       )}

//       {/* Tutor-specific controls */}
//       {authUser?.role === "tutor" ? (
//         <>
//           <div style={{ display: 'flex', gap: '4px' }}>
//             <button onClick={toggleLiveStream}>
//               {isLive ? "Stop Live" : "Go Live"}
//             </button>

//             {/* Toggle Camera */}

//             {isCamEnabled ? (
//               <button onClick={() => cam.toggle()} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Disable Camera</button>
//             ):(
//               <button onClick={() => cam.toggle()} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Enable Camera</button>
//             )}
//             {isMicEnabled ? (
//               <button onClick={() => mic.toggle()} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Mute Mic</button>
//             ):(
//               <button onClick={() => mic.toggle()} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Unmute Mic</button>
//             )}
//           </div>
//         </>
//       ) : (
//         // Non-Tutor (Viewer) controls
//         <div style={{ marginTop: "10px" }}>
//           {!hasJoined ? (
//             <button 
//               onClick={joinCall}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//               Join Stream
//             </button>
//           ) : (
//             <div>
//               <p>You are watching the live stream.</p>
//               <button 
//                 onClick={leaveCall}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
//                 Leave Stream
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* If the user is not the host, show the leave stream button */}
//       {!isHost && authUser?.role !== "tutor" && firstParticipant && (
//         <div>
//           <button 
//             onClick={leaveCall} 
//             className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
//             Leave Stream
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };


// https://getstream.io/video/docs/react/basics/quickstart/
// https://getstream.io/video/docs/react/guides/client-auth/
const apiKey = "mmhfdzb5evj2";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTM0OTQ0OCJ9.kcIo6caulWnsblvkTbgKDzBTofnTz5icj2nypIIl3Po";
const userId = "1349448";
const callId = "LStZ0S8iyxr3";

const user: User = { id: userId, name: "Tutorial" };
const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("livestream", callId);
call.join({ create: true });

export default function LivestreamViewSession() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LivestreamView />
      </StreamCall>
    </StreamVideo>
  );
}




const LivestreamView = () => {
  const {
    useCameraState,
    useMicrophoneState,
    useParticipantCount,
    useIsCallLive,
    useParticipants,
  } = useCallStateHooks();

  const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
  const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();
  
  const participantCount = useParticipantCount();
  const isLive = useIsCallLive();

  const [firstParticipant] = useParticipants();
  
  return (
    <div style={{ display: "flex", flexDirection: 'column', gap: '4px' }}>
      <div>{isLive ? `Live: ${participantCount}`: `In Backstage`}</div>
      {firstParticipant ? (
        <ParticipantView participant={firstParticipant} />
      ) : (
        <div>The host hasn't joined yet</div>
      )}
      <div style={{ display: 'flex', gap: '4px'}}>
        <button onClick={() => (isLive ? call.stopLive() : call.goLive())}>
          {isLive ? "Stop Live" : "Go Live"}
        </button>
        <button onClick={() => cam.toggle()}>
          {isCamEnabled ? "Disable camera" : "Enable camera"}
        </button>
        <button onClick={() => mic.toggle()}>
          {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
        </button>
      </div>
    </div>
  );
};
