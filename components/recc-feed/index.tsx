"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SquarePen } from "lucide-react";
import { ReccIdContainer } from "../recc-id-container";
import { ReccSaved } from "../recc-saved";
import { ReccCardItem } from "../recc-card";
import { ReccItemsRecord } from "@/xata";
import "./styles.css";

export function RecFeedItem({ recc, userId }: { recc: any; userId: string }) {
  const avatarLetters = `${recc.creator.first_name.charAt(0)}${
    recc.creator?.last_name?.charAt(0) || ""
  }`;

  return (
    <ReccIdContainer userId={userId} recc={recc}>
      <div className="flex flex-col rounded-lg bg-white">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex gap-2 items-center">
            <Avatar className="w-[24px] h-[24px]">
              <AvatarImage src={recc.creator.image_url} />
              <AvatarFallback className="font-sans">
                {avatarLetters}
              </AvatarFallback>
            </Avatar>

            <div className="font-sans font-semibold text-sm text-stone-800">
              {recc.creator.first_name} {recc.creator?.last_name || ""}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="font-sans font-semibold text-lg text-stone-800">
                {recc.title}
              </div>
              <div className="font-sans text-sm text-stone-600 truncate-two-lines">
                {recc.prompt_text}
              </div>
            </div>

            <div
              className={`flex flex-col gap-2 w-full ${
                recc.reccItems?.length > 1 ? "fade" : ""
              }`}
            >
              {recc.reccItems?.slice(0, 2)?.map((i: ReccItemsRecord) => (
                <ReccCardItem
                  key={i.id}
                  reccItem={i}
                  mode="DEFAULT"
                  imageMode="DEFAULT"
                  linkMode="INACTIVE"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-stone-100" />

        <div className="flex justify-between items-center py-0 px-4 h-[40px]">
          <div className="font-sans text-sm text-stone-800">
            {recc.recc_items?.length || 0} recc
            {recc.recc_items?.length === 1 ? "" : "s"}
          </div>

          <div className="flex gap-2">
            {userId === recc.user_id && (
              <SquarePen className="stroke-stone-600" />
            )}

            {userId !== recc.user_id && (
              <ReccSaved id={recc.id} userId={userId} />
            )}
          </div>
        </div>
      </div>
    </ReccIdContainer>
  );
}

export function ReccFeed({ reccs, userId }: { reccs: any[]; userId: string }) {
  return (
    <div className="flex flex-col gap-4 w-full flex-grow-1 px-2 pb-4">
      {reccs.map((recc, key) => (
        <RecFeedItem key={key} recc={recc} userId={userId} />
      ))}
    </div>
  );
}
