// src/components/ScreenShare.tsx

import React, { useState, useRef } from 'react';

interface ScreenShareProps {
  onStream: (stream: MediaStream) => void;
  stopStream: () => void;
}

const ScreenShare: React.FC<ScreenShareProps> = ({ onStream, stopStream }) => {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      onStream(screenStream);  // Pass the stream to the parent
      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
      }
      setIsScreenSharing(true);
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  const stopScreenShare = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      stopStream();  // Notify the parent to stop the stream
      setIsScreenSharing(false);
    }
  };

  return (
    <div>
      <h2>Screen Sharing</h2>
      {isScreenSharing ? (
        <div>
          <video ref={videoRef} autoPlay muted style={{ width: '100%' }} />
          <button onClick={stopScreenShare}>Stop Sharing</button>
        </div>
      ) : (
        <button onClick={startScreenShare}>Start Screen Share</button>
      )}
    </div>
  );
};

export default ScreenShare;
