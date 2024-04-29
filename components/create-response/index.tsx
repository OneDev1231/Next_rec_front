"use client";

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Drawer } from "../drawer";
import { createResponse } from "@/server-actions";
import { useRouter } from "next/navigation";

export default function CreateResponseComponent({
  requestId,
}: {
  requestId: string;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<"STOPPED" | "RECORDING">("STOPPED");
  const [transcript, setTranscript] = useState<string>("");
  const mediaRecorder = useRef<any>(null);

  const start = () => {
    getMedia();
  };

  const stop = () => {
    mediaRecorder.current.stop();
    setMode("STOPPED");
  };

  async function getMedia() {
    setMode("RECORDING");

    const constraints = { audio: true, video: false };
    let stream: MediaStream;

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);

      let mimeType: "audio/webm" | "audio/mp4" | "video/mp4" | "" = "";
      if (MediaRecorder.isTypeSupported("audio/webm")) {
        mimeType = "audio/webm";
      } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
        mimeType = "audio/mp4";
      } else if (MediaRecorder.isTypeSupported("video/mp4")) {
        mimeType = "video/mp4";
      } else {
        alert("mime not supported");
      }

      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType,
      });

      let chunks: any[] = [];

      mediaRecorder.current.ondataavailable = (e: any) => {
        chunks.push(e.data);
      };

      mediaRecorder.current.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());

        let finalBlob = new Blob(chunks, { type: mimeType });
        const objUrl = URL.createObjectURL(finalBlob);
        const formData = new FormData();
        formData.append(
          "audio",
          finalBlob,
          `recording.${mimeType.split("/")[1]}`
        );

        const results = await fetch("/api/classify", {
          method: "POST",
          body: formData,
        });

        const resultsParsed = await results.json();

        const createdResponse = await createResponse({
          promptText: resultsParsed,
          requestId,
        });
        if (createdResponse) router.push(`/recc/${createdResponse.id}`);
      };

      mediaRecorder.current.start(1000);
    } catch (err) {
      console.log("recording error : ", err);
    }
  }

  return (
    <Drawer backUrl="/">
      <div className="relative mt-[60px] min-h-[50svh]">
        <div className="relative p-2">
          <div className="flex flex-col justify-start bg-white rounded w-full">
            {mode === "STOPPED" && (
              <div className="w-full h-full grow gap-10 flex flex-col justify-center items-center">
                {transcript && (
                  <div className="px-6 text-slate-500">{transcript}</div>
                )}

                {!transcript && (
                  <div className="flex flex-col items-center">
                    <Image
                      src="/wave.svg"
                      alt="Recording"
                      width={115}
                      height={16}
                    />

                    <div className="pt-6 font-normal text-slate-500">
                      What do you want to share?
                    </div>
                  </div>
                )}

                <div className="flex gap">
                  {transcript && (
                    <Button
                      className="text-slate-500"
                      variant="link"
                      onClick={() => setTranscript("")}
                    >
                      Clear
                    </Button>
                  )}

                  <Button variant="default" onClick={start}>
                    {transcript ? "Record again" : "Start"}
                  </Button>
                </div>
              </div>
            )}

            {mode === "RECORDING" && (
              <div className="w-full h-full grow gap-10 flex flex-col justify-center items-center">
                <div className="flex flex-col items-center">
                  <Image
                    src="/wave-red.svg"
                    alt="Recording"
                    width={115}
                    height={16}
                  />

                  <div className="pt-6 font-normal text-slate-500">
                    Listening ...
                  </div>
                </div>
                <Button variant="destructive" onClick={stop}>
                  Stop
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
}
