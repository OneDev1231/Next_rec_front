"use client";

import { ChangeEvent, useState } from "react";
import {
  DrawerFooter,
  DrawerFooterCallbackType,
  FooterType,
} from "../drawer-footer";
import { DrawerHeader, DrawerHeaderCallbackType } from "../drawer-header";
import { deleteRequest, updateRequest } from "@/server-actions";
import { RequestCard } from "../request-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useDrawerStore } from "../drawer-v2";
import { toast } from "sonner";

export type ReccCardViewCallback = "POST";
export type RequestCardViewMode = "DEFAULT" | "EDITING";
export type RequestCardViewType = "CREATE" | "VIEW";
export function RequestCardView({
  type = "CREATE",
  request,
  userId,
  footerType = "CREATING",
  callback,
}: {
  type?: RequestCardViewType;
  request: any;
  userId: string;
  footerType?: FooterType;
  callback?: (type: ReccCardViewCallback) => void;
}) {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [mode, setMode] = useState<RequestCardViewMode>("DEFAULT");
  const setOpen = useDrawerStore((state) => state.setOpen);
  const closeCurrent = useDrawerStore((state) => state.closeCurrent);

  const isCreator = userId === request?.user_id;

  const eventTitleChange = (e: ChangeEvent<HTMLDivElement>) => {
    updateRequest({ id: request.id, promptText: e.target.innerText });
  };

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
        toast("Request saved");
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
        setShowDelete(true);
        break;
      case "POST":
        await updateRequest({ id: request.id, status: "active" });
        if (callback) callback("POST");
        break;
      case "CANCEL":
        setOpen({ id: "CREATE_REQUEST", value: false });
        break;
      default:
    }
  };

  const confirmDeletePress = async () => {
    await deleteRequest({ id: request.id });
    closeCurrent();
    window.location.href = "/requests?deleted=request";
  };

  if (!request) return null;

  return (
    <div className="flex flex-col w-full h-full min-h-0">
      <DrawerHeader
        mode={mode === "DEFAULT" ? "ITEM_VIEW" : "ITEM_EDITING"}
        canEdit={request.user_id === userId}
        callback={drawerHeaderCallback}
      />

      {type === "CREATE" && (
        <div className="flex flex-col w-full h-full p-4">
          <div
            className="font-sans text-xl text-stone-800"
            contentEditable={mode === "EDITING"}
            onBlur={eventTitleChange}
          >
            {request.prompt_text}
          </div>
        </div>
      )}

      {type === "VIEW" && <RequestCard request={request} userId={userId} />}

      {isCreator && (
        <DrawerFooter
          type={footerType}
          mode={mode === "DEFAULT" ? "ITEM_CREATE" : "ITEM_EDITING"}
          callback={drawerFooterCallback}
        />
      )}

      {/* Spacing element */}
      {type !== "VIEW" && <div className="w-full h-[200px]" />}

      <Dialog open={showDelete} onOpenChange={(value) => setShowDelete(value)}>
        <DialogContent className="rounded-md max-w-[90vw] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-left">Delete Request?</DialogTitle>
            <DialogDescription>
              {/* Cover up Shad close "x" btn */}
              <div className="w-[20px] h-[20px] absolute right-4 top-4 z-10 bg-white" />

              <div className="flex flex-col w-full">
                <div className="font-sans text-slate-800 pb-4 text-left">
                  This will permanently delete your Request and all the items
                  associated with it.
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setShowDelete(false)}
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
