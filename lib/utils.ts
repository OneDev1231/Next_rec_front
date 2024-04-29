import { type ClassValue, clsx } from "clsx";
import { MutableRefObject } from "react";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function copyToClipboard({ text }: { text: string }) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_e) {}

  return false;
}

export async function shareSheet({ url }: { url: string }) {
  try {
    // This opens only on https and on mobile browsers
    navigator.share({ url });
  } catch (e) {
    // Can't open native share sheet, copy to clipboard
    await copyToClipboard({ text: url });
    toast("Copied to clipboard!");
  }
}

export function getAvatarLetters({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const avatarLetters = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return avatarLetters;
}

export const setUpMediaRecorder = async ({
  mediaRecorder,
  callbackDataAvailable,
  callbackStop,
}: {
  mediaRecorder: MutableRefObject<any>;
  callbackDataAvailable: () => void;
  callbackStop: (arg: FormData) => void;
}) => {
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
      callbackDataAvailable();
    };

    mediaRecorder.current.onstop = async () => {
      stream.getTracks().forEach((track) => track.stop());

      // Assemble recording as a blob of data
      let finalBlob = new Blob(chunks, { type: mimeType });

      // Package up recording blob into form-appropriate structure
      // for Whisper transcription
      const formData = new FormData();
      formData.append(
        "audio",
        finalBlob,
        `recording.${mimeType.split("/")[1]}`
      );

      callbackStop(formData);
    };

    mediaRecorder.current.start(1000);
  } catch (err) {
    console.log("media recording setup error : ", err);
  }
};
