"use client";

import {
  bookmarkRecc,
  deleteReccItem,
  updateRecc,
  updateReccItem,
} from "@/server-actions";
import { ReccItemsRecord } from "@/xata";
import { ChangeEvent, useRef } from "react";
import { FilledOutRecc } from "@/types";
import { Badge } from "../ui/badge";
import { getAvatarLetters, shareSheet } from "@/lib/utils";
import { Trash, ChevronRight, Send } from "lucide-react";
import { AvatarAndName } from "../avatar-and-name";
import { StackedImage } from "../stacked-image";
import { ReccSaved } from "../recc-saved";
import { globalReccFeed } from "../bookmark";

type Mode = "DEFAULT" | "EDIT";
export type ReccCardItemImageType = "STACKED" | "DEFAULT";
export type ReccCardItemLinkMode = "ACTIVE" | "INACTIVE";

export function ReccCardItem({
  reccItem,
  mode,
  imageMode = "STACKED",
  linkMode = "ACTIVE",
}: {
  reccItem: ReccItemsRecord;
  mode: Mode;
  imageMode?: ReccCardItemImageType;
  linkMode?: ReccCardItemLinkMode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const category = `${reccItem.category
    ?.charAt(0)
    .toUpperCase()}${reccItem.category?.substring(1)}`;

  const eventTitleChange = (e: ChangeEvent<HTMLDivElement>) => {
    updateReccItem({ id: reccItem.id, title: e.target.innerText });
  };

  const eventDelete = async () => {
    // Logic to remove recc item
    await deleteReccItem({ id: reccItem.id });

    // Update the Recc feed state
    globalReccFeed.mutateSingleRecc({ reccId: reccItem.recc_list_id });

    // Visually remove this item from list of items in case
    // of local Recc state via Create Recc flow
    if (ref.current) {
      ref.current.style.display = "none";
    }
  };

  return (
    <div
      ref={ref}
      className="flex gap-4 items-center"
      onClick={(e) => {
        if (mode === "EDIT") {
          e.preventDefault();
          e.stopPropagation();
        } else if (linkMode === "ACTIVE") {
          window.open(reccItem.link || "", "_blank");
        }
      }}
    >
      {imageMode === "STACKED" && (
        <StackedImage imageUrl={reccItem.image_url || ""} />
      )}

      {imageMode === "DEFAULT" && reccItem.image_url && (
        <div
          style={{
            backgroundImage: `url("${reccItem.image_url}")`,
          }}
          className={`w-[54px] h-[80px] rounded bg-cover bg-center bg-no-repeat shrink-0`}
        />
      )}

      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-0">
          <div
            className="font-sans font-semibold text-base text-stone-800"
            contentEditable={mode === "EDIT"}
            onBlur={eventTitleChange}
          >
            {reccItem.title}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Badge
            variant="secondary"
            className="font-sans font-normal text-stone-700"
          >
            {category}
          </Badge>
        </div>
      </div>

      {mode === "DEFAULT" && (
        <ChevronRight className="ml-auto stroke-stone-500" />
      )}

      {mode === "EDIT" && (
        <Trash
          className="ml-auto w-[18px] text-stone-800 cursor-pointer"
          onClick={eventDelete}
        />
      )}
    </div>
  );
}

export function ReccCard({
  recc,
  userId,
  mode = "DEFAULT",
}: {
  recc: FilledOutRecc;
  userId: string;
  mode: Mode;
}) {
  const titleRef = useRef<HTMLDivElement>(null);

  const avatarName = `${recc.creator.first_name} ${
    recc.creator?.last_name || ""
  }`;
  const avatarImage = recc.creator.image_url;
  const avatarLetters = getAvatarLetters({
    firstName: recc.creator.first_name,
    lastName: recc.creator?.last_name || "",
  });

  const eventTitleChange = (e: ChangeEvent<HTMLDivElement>) => {
    updateRecc({ id: recc.id, title: e.target.innerText });
  };

  const eventPromptChange = (e: ChangeEvent<HTMLDivElement>) => {
    updateRecc({ id: recc.id, promptText: e.target.innerText });
  };

  const eventBookmark = () => {
    if (!userId) {
    } else {
      bookmarkRecc({ id: recc.id });
    }
  };

  const eventShare = async () => {
    const url = `${window.location.origin}/recc/${recc.id}`;
    await shareSheet({ url });
  };

  return (
    <div className="flex flex-col w-full h-full rounded-xl bg-white flex-1 overflow-auto">
      <div className="flex flex-col gap-4 p-4">
        <AvatarAndName
          avatarLetters={avatarLetters}
          avatarImage={avatarImage}
          avatarName={avatarName}
        />

        <div className="flex gap-2 items-center">
          <div className="flex flex-col gap-1">
            <div
              ref={titleRef}
              className="font-sans text-lg text-stone-800 font-semibold"
              contentEditable={mode === "EDIT"}
              onBlur={eventTitleChange}
            >
              {recc.title}
            </div>
            <div
              className="font-sans text-sm text-stone-600"
              contentEditable={mode === "EDIT"}
              onBlur={eventPromptChange}
            >
              {recc.prompt_text}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center p-4">
        <div className="font-sans text-sm text-stone-800">
          {recc.recc_items?.length || 0} reccs
        </div>

        <div className="flex gap-4 items-center">
          <Send
            className="stroke-stone-600 cursor-pointer"
            onClick={eventShare}
          />

          {recc.user_id !== userId && (
            <div
              className="flex gap-1 items-center text-sm text-stone-800 cursor-pointer"
              onClick={eventBookmark}
            >
              <ReccSaved id={recc.id} userId={userId} />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {recc.reccItems.map((reccItem, key) => (
          <ReccCardItem key={key} reccItem={reccItem} mode={mode} />
        ))}

        {/* Spacing element */}
        <div className="w-full h-[200px]" />
      </div>
    </div>
  );
}
