import React, { useEffect, useRef } from "react";

function VideoComponent({ stream, style }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video ref={videoRef} autoPlay playsInline style={style}></video>
  );
}

export default VideoComponent;
