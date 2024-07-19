"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Page() {
  const router = useRouter();

  const [videoId, setVideoID] = useState("ykG8dVplZ_g");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(videoId!==''){
      router.push(`/video/${videoId}`)
    }
  };

  return (
    <div className="container mx-auto h-full">
      <form className="flex flex-col h-full items-center justify-center" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Youtube Video Id"
          className="border-gray-400 border-2 max-w-md rounded-md px-2 py-3"
          value={videoId}
          onChange={(e:ChangeEvent<HTMLInputElement>) => {
            setVideoID(e.target.value);
          }}
          autoFocus
        />
        <button
          className="bg-gray-400 px-5 py-3 m-4 rounded-lg text-white hover:bg-blue-400"
          type="submit"
        >
          Play
        </button>
      </form>
    </div>
  );
}
