import { X } from "lucide-react";
import { LottieWave } from "../lottie-wave";

export type DrawerHeaderCallbackType =
  | "EDIT_PRESS"
  | "EDIT_SAVE"
  | "CLOSE_PRESS";
export type DrawerHeaderMode = "LOADING" | "ITEM_VIEW" | "ITEM_EDITING";
export function DrawerHeader({
  mode,
  canEdit = false,
  callback,
}: {
  mode: DrawerHeaderMode;
  canEdit?: boolean;
  callback?: ({ eventType }: { eventType: DrawerHeaderCallbackType }) => void;
}) {
  return (
    <div className="w-full h-[60px] p-4 flex items-center">
      {mode === "LOADING" && (
        <div className="w-full h-full flex justify-center scale-[.5] origin-center">
          {/* <img src="/wave-red.svg" className="w-[40px]" /> */}
          <LottieWave />
        </div>
      )}

      {mode === "ITEM_VIEW" && (
        <div className="w-full h-full flex justify-between items-center">
          <X
            className="w-[24px] stroke-stone-600"
            onClick={() => {
              if (callback) callback({ eventType: "CLOSE_PRESS" });
            }}
          />
          <img src="/wave.svg" className="w-[40px]" />

          {canEdit && (
            <div
              className="font-sans font-medium text-stone-600 cursor-pointer"
              onClick={() => {
                if (callback) callback({ eventType: "EDIT_PRESS" });
              }}
            >
              Edit
            </div>
          )}

          {!canEdit && <div className="invisible">Edit</div>}
        </div>
      )}

      {mode === "ITEM_EDITING" && (
        <div className="w-full h-full flex justify-between items-center">
          <X
            className="w-[24px] stroke-stone-600"
            onClick={() => {
              if (callback) callback({ eventType: "CLOSE_PRESS" });
            }}
          />
          <div className="font-sans font-medium text-sm text-stone-800">
            Tap to edit
          </div>
          <div
            className="font-sans font-medium text-[#FF2F00] cursor-pointer"
            onClick={() => {
              if (callback) callback({ eventType: "EDIT_SAVE" });
            }}
          >
            Save
          </div>
        </div>
      )}
    </div>
  );
}
