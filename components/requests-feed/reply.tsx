"use client";

import { ReplyAll, SquarePen } from "lucide-react";
import { Button } from "../ui/button";
import { DrawerV2 } from "../drawer-v2";
import { Requests } from "@/xata";
import CreateReccComponent from "../create-recc";

export function RequestsReply({
  userId,
  request,
  callback,
}: {
  userId: string;
  request: Requests;
  callback: (e: any) => void;
}) {
  return (
    <>
      <DrawerV2 id={`CREATE_RECC_RESPONSE_ID_${request.id}`} trigger={null}>
        <CreateReccComponent requestId={request.id} userId={userId} />
      </DrawerV2>

      <Button variant="link" className="font-sans px-0" onClick={callback}>
        {userId === request.user_id && (
          <SquarePen className="stroke-stone-600" />
        )}

        {userId !== request.user_id && (
          <>
            <span className="pr-[4px]">reply</span>{" "}
            <ReplyAll stroke="#57534E" />
          </>
        )}
      </Button>
    </>
  );
}
