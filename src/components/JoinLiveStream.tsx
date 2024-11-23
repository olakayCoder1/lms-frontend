// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useParams,
//   useNavigate,
// } from "react-router-dom";
// import {
//   StreamVideoClient,
//   StreamVideo,
//   User,
//   StreamCall,
//   ParticipantView,
//   useCallStateHooks,
// } from "@stream-io/video-react-sdk";

// // API key and other parameters
// const apiKey = "mmhfdzb5evj2";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1phbV9XZXNlbGwiLCJ1c2VyX2lkIjoiWmFtX1dlc2VsbCIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzMyMTk3MTIwLCJleHAiOjE3MzI4MDE5MjB9.dr15ONESChMPpAOU-tSArE56DglmyuV79b7i-CNS6FI";
// const userId = "Zam_Wesell";

// // User and Client Initialization
// const user: User = { id: userId, name: "Tutorial" };

// export default function JoinLiveStream(){
//   const { callId } = useParams();
//     // const callId = 'R8CZ7WlWeG0M'
//   const navigate = useNavigate();

//   // Initialize Stream Client
//   const client = new StreamVideoClient({ apiKey, user, token });
//   const call = client.call("livestream", callId);

//   // Join the call, create it if necessary
//   React.useEffect(() => {
//     if (callId) {
//       call.join({ create: true }).catch((err) => {
//         console.error("Error joining call:", err);
//         navigate("/error"); // Redirect to an error page if the call cannot be joined
//       });
//     }
//   }, [callId, call, navigate]);

//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <LivestreamView />
//       </StreamCall>
//     </StreamVideo>
//   );
// };

// const LivestreamView = () => {
//   const {
//     useCameraState,
//     useMicrophoneState,
//     useParticipantCount,
//     useIsCallLive,
//     useParticipants,
//   } = useCallStateHooks();

//   const { camera, isEnabled: isCamEnabled } = useCameraState();
//   const { microphone, isEnabled: isMicEnabled } = useMicrophoneState();
//   const participantCount = useParticipantCount();
//   const isLive = useIsCallLive();
//   const [firstParticipant] = useParticipants();
//   console.log(firstParticipant)

//   const handleGoLive = () => {
//     if (!isLive) {
//       call.goLive();
//     }
//   };

//   const handleStopLive = () => {
//     if (isLive) {
//       call.stopLive();
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
//       {/* <div>{isLive ? `Live: ${participantCount}` : `In Backstage`}</div> */}
//       {firstParticipant ? (
//         <>
//             <ParticipantView participant={firstParticipant} />
//             <button onClick={() => microphone.toggle()}>
//             {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
//             </button>
//         </>
        
//       ) : (
//         <div>The host hasn't joined yet</div>
//       )}
//       <div style={{ display: "flex", gap: "4px" }}>
//         {/* <button onClick={isLive ? handleStopLive : handleGoLive}>
//           {isLive ? "Stop Live" : "Go Live"}
//         </button> */}
//         {/* <button onClick={() => camera.toggle()}>
//           {isCamEnabled ? "Disable camera" : "Enable camera"}
//         </button> */}
//         {/* <button onClick={() => microphone.toggle()}>
//           {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
//         </button> */}
//       </div>
//     </div>
//   );
// };



import React from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import {
  StreamVideoClient,
  StreamVideo,
  User,
  StreamCall,
  ParticipantView,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

// API key and other parameters
const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1phbV9XZXNlbGwiLCJ1c2VyX2lkIjoiWmFtX1dlc2VsbCIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzMyMTk3MTIwLCJleHAiOjE3MzI4MDE5MjB9.dr15ONESChMPpAOU-tSArE56DglmyuV79b7i-CNS6FI";
const userId = "Zam_Wesell";

// User and Client Initialization
const user: User = { id: userId, name: "Tutorial" };

export default function JoinLiveStream() {
  const { callId } = useParams(); // Dynamically get the callId from the URL
  const navigate = useNavigate();

  // Initialize Stream Client
  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call("livestream", callId);

  // Join the call, create it if necessary
  React.useEffect(() => {
    if (callId) {
      call
        .join({ create: true })
        .catch((err) => {
          console.error("Error joining call:", err);
          navigate("/error"); // Redirect to an error page if the call cannot be joined
        });
    }
  }, [callId, call, navigate]);

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LivestreamView call={call} />
      </StreamCall>
    </StreamVideo>
  );
}

const LivestreamView = ({ call }) => {
  const {
    useCameraState,
    useMicrophoneState,
    useParticipantCount,
    useIsCallLive,
    useParticipants,
  } = useCallStateHooks();

  const { camera, isEnabled: isCamEnabled } = useCameraState();
  const { microphone, isEnabled: isMicEnabled } = useMicrophoneState();
  const participantCount = useParticipantCount();
  const isLive = useIsCallLive();
  const [firstParticipant] = useParticipants(); // Get the first participant

  // Log out the participant state to debug
  React.useEffect(() => {
    console.log("Current first participant:", firstParticipant);
  }, [firstParticipant]);

  if (!firstParticipant) {
    return <div>The host hasn't joined yet.</div>; 
  }

  const handleGoLive = () => {
    if (!isLive) {
      call.goLive(); // Start the live stream if not live
    }
  };

  const handleStopLive = () => {
    if (isLive) {
      call.stopLive(); // Stop the live stream if already live
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {/* Display participant count or backstage message */}
      <div>{isLive ? `Live: ${participantCount}` : `In Backstage`}</div>

      {/* Render the first participant's view if they are available */}
      {firstParticipant ? (
        <>
          <ParticipantView participant={firstParticipant} />
          <button onClick={() => microphone.toggle()}>
            {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
          </button>
        </>
      ) : (
        <div>The host hasn't joined yet</div>
      )}

      <div style={{ display: "flex", gap: "4px" }}>
        {isLive ? (
          <button onClick={handleStopLive}>Stop Live</button>
        ) : (
          <button onClick={handleGoLive}>Go Live</button>
        )}
        <button onClick={() => camera.toggle()}>
          {isCamEnabled ? "Disable Camera" : "Enable Camera"}
        </button>
        <button onClick={() => microphone.toggle()}>
          {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
        </button>
      </div>
    </div>
  );
};


