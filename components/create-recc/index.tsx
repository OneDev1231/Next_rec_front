"use client";

import { useEffect, useRef, useState } from "react";
import { createRecc, createResponse } from "@/server-actions";
import { ReccCardView, ReccCardViewCallback } from "../recc-card-view";
import { ReccLoading } from "../recc-loading";
import { setUpMediaRecorder } from "@/lib/utils";
import { StopButton } from "../stop-button";
import { useDrawerStore } from "../drawer-v2";
import { mutate } from "swr";
import { REQUEST_BY_ID_URL } from "../request-id-container";
import { REQUEST_RESPONSES_URL } from "../requests-feed";
import { CreateWaves } from "../create-waves";
import { toast } from "sonner";

export type Mode = "ON" | "LISTENING" | "LOADING" | "FINISHED" | "SHARE";

export default function CreateReccComponent({
  userId,
  requestId = null,
}: {
  userId: string;
  requestId?: string | null;
}) {
  const setOpen = useDrawerStore((state) => state.setOpen);
  const setHandle = useDrawerStore((state) => state.setHandle);
  const setDismissable = useDrawerStore((state) => state.setDismissable);
  const mediaRecorder = useRef<any>(null);
  const stopAndTeardownMediaRecorder = useRef<boolean>(false);
  const closeCurrentDrawer = useDrawerStore((state) => state.closeCurrent);

  const [mode, setMode] = useState<Mode>("ON");
  const [recc, setRecc] = useState<any>(null);

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
        if (requestId) {
          // Close create recc
          setOpen({ id: `CREATE_RECC_RESPONSE_ID_${requestId}`, value: false });
          mutate([REQUEST_BY_ID_URL, requestId]);
          mutate([REQUEST_RESPONSES_URL, requestId]);

          toast("Recc published");
        } else {
          closeCurrentDrawer();
          setTimeout(() => {
            window.location.href = "/reccs?posted=recc";
          }, 200);
        }

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
          if (stopAndTeardownMediaRecorder.current) return;

          setMode("LOADING");

          const transcription = await fetch("/api/classify", {
            method: "POST",
            body: data,
          });
          const transcriptionParsed = await transcription.json();

          let assembledRecc;
          if (requestId) {
            assembledRecc = await createResponse({
              promptText: transcriptionParsed,
              requestId,
            });
          } else {
            assembledRecc = await createRecc({
              promptText: transcriptionParsed,
            });
          }

          setRecc(assembledRecc);
          setMode("FINISHED");
        },
      });
    }

    return () => {
      if (mediaRecorder?.current) stop();
    };
  }, [mediaRecorder, stopAndTeardownMediaRecorder]);

  // Turn on/off Drawer handle based on particular views
  useEffect(() => {
    // Setting drawer handle
    if (mode === "LOADING" || mode === "FINISHED") {
      setHandle({ id: "CREATE_RECC", value: false });
    }

    // Setting drawer dismissable
    if (mode === "LOADING") {
      setDismissable({ id: "CREATE_RECC", value: false });
    } else {
      setDismissable({ id: "CREATE_RECC", value: true });
    }
  }, [mode, setHandle, setDismissable]);

  return (
    <div className="flex flex-col justify-start bg-white rounded w-full h-full">
      {(mode === "ON" || mode === "LISTENING") && (
        <div className="w-full h-full p-4 pt-[80px] grow gap-[96px] flex flex-col justify-center items-center">
          <div className="flex flex-col gap-4 items-center">
            <div className="font-normal text-slate-500">
              {mode === "LISTENING"
                ? "Listening ..."
                : "What do you recommend?"}
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

      {mode === "FINISHED" && recc && (
        <div className="relative w-full h-full grow flex flex-col justify-center items-between">
          <ReccCardView
            recc={recc}
            requestId={requestId}
            userId={userId}
            callback={cardViewCallback}
          />
        </div>
      )}
    </div>
  );
}
