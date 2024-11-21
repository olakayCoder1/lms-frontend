// src/components/Video.tsx
import React, { useEffect, useRef } from 'react';

interface VideoProps {
  stream: MediaStream | null;
}

const Video: React.FC<VideoProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return <video ref={videoRef} autoPlay muted style={{ width: '100%' }} />;
};

export default Video;
