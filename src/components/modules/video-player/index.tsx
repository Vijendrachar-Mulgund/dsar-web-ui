import React, { useRef } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  width?: string;
  height?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, width = "100%", height = "auto" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div style={{ textAlign: "center" }}>
      <video ref={videoRef} src={src} poster={poster} width={width} height={height} controls>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
