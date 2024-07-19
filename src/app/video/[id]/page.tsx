"use client";

import useFetchVideoData from "@/hooks/fetchVideoData";
import TextComponent from "@/src/components/TextComponent/TextComponent";
import Player from "@/src/components/YoutubePlayer/Player";
import { getSeconds } from "@/utils/TimeUtils";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const videoId = params.id;
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentTranscriptCaption, setCurrentTranscriptCaption] = useState<
    string | null
  >(null);
  const [currentTranslationCaption, setCurrentTranslationCaption] = useState<
    string | null
  >(null);
  const [isPlaying, SetIsPlaying] = useState(false);

  const {
    data: TranscriptData,
    error: TranscriptError,
    loading: TranscriptLoading,
  } = useFetchVideoData("Transcript", videoId);
  const {
    data: TranslationData,
    error: TranslationError,
    loading: TranslationLoading,
  } = useFetchVideoData("Translate", videoId);

  useEffect(() => {
    if (!isPlaying) {
      setCurrentTranscriptCaption("");
      setCurrentTranslationCaption("");
      return;
    }
    if (TranscriptData && currentTime) {
      let transcriptCaptions = TranscriptData.captions;

      let caption = transcriptCaptions.find((caption: any) => {
        let startTime = getSeconds(caption?.start_time as string);
        let endTime = getSeconds(caption?.end_time as string);

        return startTime <= currentTime && endTime >= currentTime;
      });
      let currentCaption = caption
        ? caption.phrases.map((phrase: any) => phrase.text).join(" ")
        : null;

      currentTranscriptCaption !== currentCaption &&
        setCurrentTranscriptCaption(currentCaption);
    }

    if (TranslationData && currentTime) {
      let translationCaptions = TranslationData.captions;

      let caption = translationCaptions.find((caption: any) => {
        let startTime = getSeconds(caption?.start_time as string);
        let endTime = getSeconds(caption?.end_time as string);

        return startTime <= currentTime && endTime >= currentTime;
      });

      let currentCaption = caption
        ? caption.phrases.map((phrase: any) => phrase.text).join(" ")
        : null;
      currentTranslationCaption !== currentCaption &&
        setCurrentTranslationCaption(currentCaption);
    }
  }, [currentTime, TranscriptData, TranslationData]);

  if (TranscriptLoading || TranslationLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (TranscriptError || TranslationError) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        Error: {TranscriptError?.message || TranslationError?.message}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex md:flex-row flex-col-reverse md:w-[95%] lg:w-[90%] md:h-1/2 w-full h-auto">
        <div className=" md:w-1/2 md:h-full min-h-32 content-center md:p-2 p-4">
          <TextComponent
            heading="Transcript"
            Text={currentTranscriptCaption ?? ""}
          />
          <TextComponent
            heading="Translation"
            Text={currentTranslationCaption ?? ""}
          />
        </div>
        <div className=" md:w-1/2 h-full content-center md:p-2 p-4">
          <Player
            videoId={videoId}
            setCurrentTime={setCurrentTime}
            setIsPlaying={SetIsPlaying}
          />
        </div>
      </div>
    </div>
  );
}
