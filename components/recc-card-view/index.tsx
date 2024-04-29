"use client";

import { useState } from "react";
import {
  DrawerFooter,
  DrawerFooterCallbackType,
  FooterType,
} from "../drawer-footer";
import { DrawerHeader, DrawerHeaderCallbackType } from "../drawer-header";
import { deleteRecc, updateRecc } from "@/server-actions";
import { ReccCard } from "../recc-card";
import { useDrawerStore } from "../drawer-v2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { mutate } from "swr";
import { REQUEST_BY_ID_URL } from "../request-id-container";
import { REQUEST_RESPONSES_URL } from "../requests-feed";
import { toast } from "sonner";

export type ReccCardViewCallback = "POST";
export type ReccCardViewMode = "DEFAULT" | "EDITING";
export function ReccCardView({
  recc,
  requestId = null,
  userId,
  footerType = "CREATING",
  callback,
}: {
  recc: any;
  requestId?: string | null;
  userId: string;
  footerType?: FooterType;
  callback?: (type: ReccCardViewCallback) => void;
}) {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [mode, setMode] = useState<ReccCardViewMode>("DEFAULT");
  const setOpen = useDrawerStore((state) => state.setOpen);
  const closeCurrent = useDrawerStore((state) => state.closeCurrent);

  const isCreator = userId === recc?.user_id;

  const drawerHeaderCallback = ({
    eventType,
  }: {
    eventType: DrawerHeaderCallbackType;
  }) => {
    switch (eventType) {
      case "EDIT_PRESS":
        setMode("EDITING");
        break;
      case "EDIT_SAVE":
        setMode("DEFAULT");
        toast("Recc saved");
        break;
      case "CLOSE_PRESS":
        closeCurrent();
        break;
      default:
    }
  };

  const drawerFooterCallback = async ({
    eventType,
  }: {
    eventType: DrawerFooterCallbackType;
  }) => {
    switch (eventType) {
      case "DELETE":
        setOpenDelete(true);
        break;
      case "POST":
        await updateRecc({ id: recc.id, status: "active" });
        if (callback) callback("POST");
        break;
      case "CANCEL":
        setOpen({ id: "CREATE_RECC", value: false });
        break;
      default:
    }
  };

  const confirmDeletePress = async () => {
    await deleteRecc({ id: recc.id });

    if (requestId) {
      mutate([REQUEST_BY_ID_URL, requestId]);
      mutate([REQUEST_RESPONSES_URL, requestId]);
    } else {
      // Refresh the /reccs feed page
      // Give the drawer time to start closing
      setTimeout(
        () => (window.location.href = window.location.href + "?deleted=recc"),
        300
      );
    }

    closeCurrent();
  };

  if (!recc) return null;

  return (
    <div className="flex flex-col w-full h-full min-h-0">
      <DrawerHeader
        mode={mode === "DEFAULT" ? "ITEM_VIEW" : "ITEM_EDITING"}
        canEdit={recc.user_id === userId}
        callback={drawerHeaderCallback}
      />

      <ReccCard
        //@ts-ignore
        recc={recc}
        userId={userId}
        mode={mode === "DEFAULT" ? "DEFAULT" : "EDIT"}
      />

      {isCreator && (
        <DrawerFooter
          type={footerType}
          primaryCtaText={requestId ? "Reply" : "Post"}
          mode={mode === "DEFAULT" ? "ITEM_CREATE" : "ITEM_EDITING"}
          callback={drawerFooterCallback}
        />
      )}

      <Dialog open={openDelete} onOpenChange={(value) => setOpenDelete(value)}>
        <DialogContent className="rounded-md max-w-[90vw] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-left">Delete Recc?</DialogTitle>
            <DialogDescription>
              {/* Cover up Shad close "x" btn */}
              <div className="w-[20px] h-[20px] absolute right-4 top-4 z-10 bg-white" />

              <div className="flex flex-col w-full">
                <div className="font-sans text-slate-800 pb-4 text-left">
                  This will permanently delete your Recc and all the items
                  associated with it.
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setOpenDelete(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={confirmDeletePress}>
                    Delete
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
