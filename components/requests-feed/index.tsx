"use client";

import { getAvatarLetters } from "@/lib/utils";
import { AvatarAndName } from "../avatar-and-name";
import { RequestContent } from "../request-content";
import { RequestsRecord } from "@/xata";
import { RequestsReply } from "./reply";
import { RequestIdContainer } from "../request-id-container";
import useSWR from "swr";
import { useDrawerStore } from "../drawer-v2";
import { SquarePen } from "lucide-react";

export const REQUEST_RESPONSES_URL = "/api/request-responses";

const requestResponsesFetcher = async ({
  url,
  id,
}: {
  url: string;
  id: string;
}) => {
  const query = await fetch(`${url}?id=${id}`);
  const response = await query.json();

  return response;
};

const useRequestResponses = ({ id }: { id: string }) => {
  const { data: responses } = useSWR([REQUEST_RESPONSES_URL, id], ([url, id]) =>
    requestResponsesFetcher({ url, id })
  );

  return { responses };
};

export function RequestsResponses({ id }: { id: string }) {
  const { responses } = useRequestResponses({ id });

  const responsesText =
    responses === undefined
      ? ""
      : responses?.length === 0
      ? "No replies yet"
      : responses?.length === 1
      ? "1 reply"
      : `${responses?.length} replies`;

  return (
    <div className="font-sans text-sm text-stone-800">{responsesText}</div>
  );
}

const creatorByIdFetcher = async ({ url, id }: { url: string; id: string }) => {
  const query = await fetch(`${url}?id=${id}`);
  const response = await query.json();

  return response;
};

const useCreatorById = ({ id }: { id: string }) => {
  const { data: creator } = useSWR(["/api/creator-by-id", id], ([url, id]) =>
    creatorByIdFetcher({ url, id })
  );

  return { creator };
};

export function AvatarContainer({ id }: { id: string }) {
  const { creator } = useCreatorById({ id });

  const firstName = creator?.first_name || "";
  const lastName = creator?.last_name || "";
  const imageUrl = creator?.image_url || "";

  const avatarLetters = creator
    ? getAvatarLetters({
        firstName,
        lastName,
      })
    : "";

  const avatarName = `${firstName} ${lastName}`;
  const avatarImage = imageUrl;

  return (
    <AvatarAndName
      avatarLetters={avatarLetters}
      avatarName={avatarName}
      avatarImage={avatarImage}
    />
  );
}

export function RequestFeedItem({
  request,
  userId,
}: {
  request: RequestsRecord;
  userId: string;
}) {
  const setOpen = useDrawerStore((state) => state.setOpen);

  const replyCallback = (e: any) => {
    if (userId && userId !== request.user_id) {
      e.preventDefault();
      e.stopPropagation();

      setOpen({
        id: `CREATE_RECC_RESPONSE_ID_${request.id}`,
        value: true,
      });
    } else if (!userId) {
      e.preventDefault();
      e.stopPropagation();

      setOpen({ id: "AUTHENTICATION_VIA_FOOTER", value: true });
    }
  };

  return (
    <RequestIdContainer request={request} userId={userId}>
      <div className="flex flex-col rounded-lg bg-white">
        <div className="flex flex-col gap-[12px] w-full p-[16px] rounded">
          <AvatarContainer id={request.user_id || ""} />

          <RequestContent title={request.prompt_text || ""} />
        </div>

        <div className="w-full h-[1px] bg-stone-100" />

        <div className="flex justify-between items-center py-0 px-4">
          <RequestsResponses id={request.id} />

          <RequestsReply
            userId={userId}
            request={request}
            callback={replyCallback}
          />
        </div>
      </div>
    </RequestIdContainer>
  );
}

export const REQUESTS_FEED_URL = "/api/requests-feed";

const requestsFeedFetcher = async ({
  url,
  offset,
}: {
  url: string;
  offset: number;
}) => {
  const query = await fetch(`${url}?offset=${offset}`);
  const response = await query.json();

  return response as RequestsRecord[];
};

const useRequestsFeed = ({ offset }: { offset: number }) => {
  const { data: requests } = useSWR(
    [REQUESTS_FEED_URL, offset],
    ([url, offset]) => requestsFeedFetcher({ url, offset })
  );

  return {
    requests,
  };
};

export function RequestsFeed({
  userId = "",
  offset = 0,
}: {
  userId?: string;
  offset?: number;
}) {
  const { requests } = useRequestsFeed({ offset });

  return (
    <div className="flex flex-col gap-4 w-full flex-grow-1 px-2 pb-[100px]">
      {(requests || []).map((request, key) => (
        <RequestFeedItem key={key} request={request} userId={userId} />
      ))}
    </div>
  );
}
