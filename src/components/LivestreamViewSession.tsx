import { useState,useEffect } from "react";
import {
    StreamVideoClient,
    StreamVideo,
    User,
    StreamCall,
  } from "@stream-io/video-react-sdk";
import { ParticipantView, useCallStateHooks } from '@stream-io/video-react-sdk'; 
  
const apiKey = "mmhfdzb5evj2";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1phbV9XZXNlbGwiLCJ1c2VyX2lkIjoiWmFtX1dlc2VsbCIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzMyMTk3MTIwLCJleHAiOjE3MzI4MDE5MjB9.dr15ONESChMPpAOU-tSArE56DglmyuV79b7i-CNS6FI";
const userId = "Zam_Wesell";
const callId = "R8CZ7WlWeG0M";

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


// ... the rest of the code

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
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (firstParticipant && firstParticipant.id === userId) {
      setIsHost(true);
    }
  }, [firstParticipant]);

  // Function to leave the stream
  const handleLeaveStream = () => {
    call.leave(); // Leave the stream if the participant is not the host
  };
  
  return (
    <div style={{ display: "flex", flexDirection: 'column', gap: '4px' }}>
      <div>{isLive ? `Live: ${participantCount}`: `In Backstage`}</div>
      {firstParticipant ? (
        <ParticipantView participant={firstParticipant} />
      ) : (
        <div>The host hasn't joined yet</div>
      )}

      {/* If not the first participant (host), show leave stream button */}
      {!isHost && (
        <div>
          <button onClick={handleLeaveStream}>Leave Stream</button>
        </div>
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