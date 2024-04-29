"use client";

import { useEffect, useRef, useState } from "react";
import { createRequest } from "@/server-actions";
import { ReccCardViewCallback } from "../recc-card-view";
import { ReccLoading } from "../recc-loading";
import { setUpMediaRecorder } from "@/lib/utils";
import { StopButton } from "../stop-button";
import { RequestCardView } from "../request-card-view";
import { useDrawerStore } from "../drawer-v2";
import { CreateWaves } from "../create-waves";

type Mode = "ON" | "LISTENING" | "LOADING" | "FINISHED" | "SHARE";

export default function CreateRequestComponent({ userId }: { userId: string }) {
  const mediaRecorder = useRef<any>(null);
  const stopAndTeardownMediaRecorder = useRef<boolean>(false);
  const setHandle = useDrawerStore((state) => state.setHandle);
  const setDismissable = useDrawerStore((state) => state.setDismissable);
  const closeCurrentDrawer = useDrawerStore((state) => state.closeCurrent);

  const [mode, setMode] = useState<Mode>("ON");
  const [request, setRequest] = useState<any>(null);

  // Stop the recording
  const stopButtonPress = () => {
    mediaRecorder.current?.stop();
  };

  const stop = () => {
    stopAndTeardownMediaRecorder.current = true;
    mediaRecorder.current?.stop();
  };

  const cardViewCallback = (type: ReccCardViewCallback) => {
    switch (type) {
      case "POST":
        closeCurrentDrawer();
        setTimeout(() => {
          window.location.href = "/requests?posted=request";
        }, 200);
        break;
      default:
    }
  };

  // Init recording and pass callbacks
  // to handle state/data changes
  useEffect(() => {
    if (!mediaRecorder.current) {
      setUpMediaRecorder({
        mediaRecorder,
        callbackDataAvailable: () => {
          setMode((curr) => {
            if (curr === "ON") return "LISTENING";
            return curr;
          });
        },
        callbackStop: async (data) => {
          setMode("LOADING");

          const transcription = await fetch("/api/classify", {
            method: "POST",
            body: data,
          });
          const transcriptionParsed = await transcription.json();

          const assembledRequest = await createRequest({
            promptText: transcriptionParsed,
          });

          setRequest(assembledRequest);
          setMode("FINISHED");
        },
      });
    }

    return () => {
      if (mediaRecorder?.current) stop();
    };
  }, [mediaRecorder]);

  // Turn on/off Drawer handle based on particular views
  useEffect(() => {
    if (mode === "LOADING" || mode === "FINISHED") {
      setHandle({ id: "CREATE_REQUEST", value: false });
    }

    if (mode === "LOADING") {
      setDismissable({ id: "CREATE_REQUEST", value: false });
    } else {
      setDismissable({ id: "CREATE_REQUEST", value: true });
    }
  }, [mode, setHandle]);

  return (
    <div className="flex flex-col justify-start bg-white rounded w-full h-full">
      {(mode === "ON" || mode === "LISTENING") && (
        <div className="w-full h-full p-4 pt-[80px] grow gap-[96px] flex flex-col justify-center items-center">
          <div className="flex flex-col gap-4 items-center">
            <div className="font-normal text-slate-500">
              {mode === "LISTENING" ? "Listening ..." : "Make a request"}
            </div>

            <CreateWaves mode={mode} />
          </div>

          <StopButton onClick={stopButtonPress} />
        </div>
      )}

      {mode === "LOADING" && (
        <div className="relative w-full h-full grow flex flex-col gap-[50px] justify-center items-center rounded p-4 pb-[57px]">
          <ReccLoading />
        </div>
      )}

      {mode === "FINISHED" && request && (
        <div className="relative w-full h-full grow flex flex-col justify-center items-between">
          <RequestCardView
            request={request}
            userId={userId}
            callback={cardViewCallback}
          />
        </div>
      )}

      {/* {mode === "SHARE" && request && (
        <div className="relative w-full h-full grow flex flex-col justify-center items-between">
          <CreateRequestShare request={request} />
        </div>
      )} */}
    </div>
  );
}
