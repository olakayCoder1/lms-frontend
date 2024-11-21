import React, { useRef, useEffect, useState } from "react";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  const startDrawing = (e) => {
    setDrawing(true);
    const context = canvasRef.current.getContext('2d');
    context.moveTo(e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop);
    context.beginPath();
  };

  const draw = (e) => {
    if (!drawing) return;
    const context = canvasRef.current.getContext('2d');
    context.lineTo(e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop);
    context.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
    };
  }, [drawing]);

  return (
    <div>
      <h2>Whiteboard</h2>
      <canvas ref={canvasRef} width={500} height={500} style={{ border: "1px solid black" }} />
    </div>
  );
};

export default Whiteboard;
