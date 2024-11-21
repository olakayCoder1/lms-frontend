// src/App.tsx
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import Video from './Video';
import ScreenShare from './ScreenShare';

// Set up the WebSocket connection
const socket = io('http://localhost:8000/ws/video/');

const SharePage: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<Peer.Instance | null>(null);

  const myVideoRef = useRef<HTMLVideoElement | null>(null);
  const userVideoRef = useRef<HTMLVideoElement | null>(null);

  // Get user's media (webcam)
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  }, []);

  useEffect(() => {
    socket.on('message', (data: any) => {
      if (data.type === 'offer') {
        handleOffer(data);
      } else if (data.type === 'answer') {
        handleAnswer(data);
      } else if (data.type === 'ice_candidate') {
        handleIceCandidate(data);
      }
    });
  }, []);

  // Handle incoming offer
  const handleOffer = (data: any) => {
    const peerConnection = new Peer({
      initiator: false,
      trickle: false,
      stream: localStream,
    });

    peerConnection.on('signal', (signal: any) => {
      socket.emit('message', { type: 'answer', signal });
    });

    peerConnection.on('stream', (stream: MediaStream) => {
      setRemoteStream(stream);
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
    });

    peerConnection.signal(data.signal);
    setPeer(peerConnection);
  };

  // Handle incoming answer
  const handleAnswer = (data: any) => {
    if (peer) {
      peer.signal(data.signal);
    }
  };

  // Handle incoming ICE candidates
  const handleIceCandidate = (data: any) => {
    if (peer) {
      peer.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  };

  // Start video call by sending offer
  const startCall = () => {
    const peerConnection = new Peer({
      initiator: true,
      trickle: false,
      stream: localStream,
    });

    peerConnection.on('signal', (signal: any) => {
      socket.emit('message', { type: 'offer', signal });
    });

    peerConnection.on('stream', (stream: MediaStream) => {
      setRemoteStream(stream);
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
    });

    setPeer(peerConnection);
  };

  // Handle stream change (for screen sharing)
  const handleStreamChange = (stream: MediaStream) => {
    setLocalStream(stream);
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = stream;
    }
  };

  // Handle stopping screen share
  const stopStream = () => {
    if (myVideoRef.current && localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
  };

  return (
    <div>
      <h1>React WebRTC Video Call</h1>
      <div>
        <h3>Your Video</h3>
        <Video stream={localStream} />
        <h3>Remote Video</h3>
        <Video stream={remoteStream} />
      </div>
      <ScreenShare onStream={handleStreamChange} stopStream={stopStream} />
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default SharePage;
