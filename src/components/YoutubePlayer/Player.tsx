"use client";
import React from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

const Player = ({
  videoId,
  setCurrentTime,
  setIsPlaying
}: {
  videoId: string;
  setCurrentTime: (arg: number) => void;
  setIsPlaying:(arg:boolean)=>void;
}) => {
  const onReady = (event: any) => {
    const player = event.target;
    
    setInterval(() => {
      const time = player.getCurrentTime();
      setCurrentTime(time);
    }, 1000);
  };

  const onPlayerStateChange = (event: YouTubeEvent<number>) => {
    if (event.data !== 1) { // Video is not playing
     setIsPlaying(false);
    }else{
      setIsPlaying(true)
    }
  };
  return (
    <YouTube
      videoId={videoId}
      id={videoId}
      iframeClassName="h-[80%] w-full"
      title={"Youtube Video"}
      loading={"Loading"}
      onReady={onReady}
      onStateChange={onPlayerStateChange}
    />
  );
};

export default React.memo(Player);
