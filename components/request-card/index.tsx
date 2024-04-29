"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FilledOutRecc, FilledOutRequest } from "@/types";
import { getAvatarLetters, shareSheet } from "@/lib/utils";
import Link from "next/link";
import { AvatarAndName } from "../avatar-and-name";
import { RequestContent } from "../request-content";
import { ChevronRight, ReplyAll, Send } from "lucide-react";
import { Button } from "../ui/button";
import { DrawerV2, useDrawerStore } from "../drawer-v2";
import CreateReccComponent from "../create-recc";
import { ReccIdContainerWithQuery } from "../recc-id-container-with-query";

function RequestCardItem({
  reccList,
  userId,
  request,
}: {
  reccList: FilledOutRecc;
  userId: string;
  request: FilledOutRequest;
}) {
  const avatarLetters = getAvatarLetters({
    firstName: reccList.creator.first_name,
    lastName: reccList.creator?.last_name || "",
  });
  return (
    // <Link href={`/recc/${reccList.id}`}>
    <ReccIdContainerWithQuery
      userId={userId}
      reccId={reccList.id}
      requestId={request.id}
    >
      <div className="flex gap-4">
        <Avatar className="w-[66px] h-[66px]">
          <AvatarImage src={reccList.creator.image_url} />
          <AvatarFallback className="font-sans">{avatarLetters}</AvatarFallback>
        </Avatar>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-0">
            <div className="font-sans text-xs text-stone-600">
              {reccList.creator.first_name} {reccList.creator?.last_name || ""}
            </div>
            <div className="font-sans font-semibold text-base text-stone-800">
              {reccList.title}
            </div>
            <div className="font-sans text-sm text-stone-600">
              {reccList.recc_items?.length?.toString()}{" "}
              {reccList.recc_items?.length === 0 ||
              (reccList.recc_items?.length || 0) > 1
                ? "reccs"
                : "recc"}
            </div>
          </div>

          <ChevronRight stroke="#57534E" />
        </div>
      </div>
    </ReccIdContainerWithQuery>
    // </Link>
  );
}

export function RequestCard({
  userId,
  request,
}: {
  userId: string;
  request: FilledOutRequest;
}) {
  const setOpen = useDrawerStore((state) => state.setOpen);

  const avatarLetters = `${request.creator.first_name.charAt(0)}${
    request.creator?.last_name?.charAt(0) || ""
  }`;
  const avatarName = `${request.creator.first_name} ${
    request.creator?.last_name || ""
  }`;
  const avatarImage = request.creator.image_url;

  const responsesText =
    request.reccListResponses?.length === 0
      ? "No replies yet"
      : request.reccListResponses?.length === 1
      ? "1 reply"
      : `${request.reccListResponses?.length} replies`;

  const replyPress = () => {
    if (userId) {
      setOpen({
        id: `CREATE_RECC_RESPONSE_ID_${request.id}`,
        value: true,
      });
    } else {
      setOpen({ id: "AUTHENTICATION_VIA_FOOTER", value: true });
    }
  };

  const eventShare = async () => {
    const url = `${window.location.origin}/request/${request.id}`;
    await shareSheet({ url });
  };

  return (
    <div className="flex flex-col rounded-xl bg-white flex-1 overflow-auto">
      <DrawerV2 id={`CREATE_RECC_RESPONSE_ID_${request.id}`} trigger={null}>
        <CreateReccComponent requestId={request.id} userId={userId} />
      </DrawerV2>

      <div className="flex flex-col gap-4 p-4">
        <AvatarAndName
          avatarLetters={avatarLetters}
          avatarName={avatarName}
          avatarImage={avatarImage}
        />

        <RequestContent title={request.prompt_text || ""} />
      </div>

      <div className="flex justify-between items-center py-2 px-4">
        <div className="font-sans text-sm text-stone-800">{responsesText}</div>
        <div className="flex gap-4 items-center">
          {userId === request.user_id && (
            <Send
              className="stroke-stone-600 cursor-pointer"
              onClick={eventShare}
            />
          )}

          {userId !== request.user_id && (
            <Button
              variant="link"
              className="font-sans px-0"
              onClick={replyPress}
            >
              <span className="pr-[4px]">reply</span>{" "}
              <ReplyAll stroke="#57534E" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col h-fit gap-4 p-4">
          {(request.reccListResponses || []).map((reccList, key) => (
            <RequestCardItem
              key={key}
              request={request}
              reccList={reccList}
              userId={userId}
            />
          ))}
        </div>

        <div className="w-full h-[200px]" />
      </div>
    </div>
  );
}
