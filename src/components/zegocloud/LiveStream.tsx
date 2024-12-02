import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function LiveStream(props) {
    
    const [roomId, setRoomId] = React.useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/livestream/${roomId}`);
    }
    return (
        <>
            <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <button onClick={handleClick}>Join Room</button>
        </>
    )
}
