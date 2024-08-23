import React, { useRef } from "react";

import { VideoPlayerProps } from "@/types/case";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  liveVideoURL,
  width = "auto",
  height = "auto",
  isLive = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div style={{ textAlign: "center" }}>
      {!isLive ? (
        <video
          className="h-[750px] max-w-full rounded-lg"
          ref={videoRef}
          src={src}
          width={width}
          height={height}
          controls
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="relative h-[750px] max-w-full mx-auto">
          <img
            src={liveVideoURL}
            width={width}
            height={height}
            alt="Live Stream"
            className="aspect-video object-cover rounded-lg h-[750px] max-w-full"
          />
          <div className="absolute top-4 left-4 bg-red-500 shadow-2xl text-white font-bold px-3 py-1 rounded-md">
            LIVE
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
