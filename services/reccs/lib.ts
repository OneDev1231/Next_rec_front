"use server";

import { ReccListsRecord, RequestsRecord, getXataClient } from "../../xata";

const xata = getXataClient();

export async function getReccItemsForReccList({
  recc,
}: {
  recc: ReccListsRecord;
}) {
  return xata.db.recc_items.filter({ recc_list_id: recc?.id }).getAll();
}

export async function assembleRequests({
  requests,
}: {
  requests: RequestsRecord[];
}) {
  const adjustedRequests = [];

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    const reccListResponses = await getReccListResponsesForRequest({
      requestId: request.id,
    });
    const creator = await getCreatorForRequest({ request });
    adjustedRequests.push({ ...request, creator, reccListResponses });
  }

  return adjustedRequests;
}

export async function getReccListResponsesForRequest({
  requestId,
}: {
  requestId: string;
}) {
  const reccLists = await xata.db.recc_lists
    .filter({ request_id: requestId })
    .getMany();
  const adjustedReccLists = [];

  for (let i = 0; i < reccLists.length; i++) {
    const recc = reccLists[i];
    // @ts-ignore
    const reccItems = await getReccItemsForReccList({ recc });
    // @ts-ignore
    const creator = await getCreatorForReccList({ recc });
    adjustedReccLists.push({ ...recc, creator, reccItems });
  }

  return adjustedReccLists;
}

export async function getCreatorForReccList({
  recc,
}: {
  recc: ReccListsRecord;
}) {
  return xata.db.users
    .filter({ id: recc.user_id as string })
    .select(["first_name", "last_name", "image_url"])
    .getFirst();
}

export async function getCreatorForRequest({
  request,
}: {
  request: RequestsRecord;
}) {
  return xata.db.users
    .filter({ id: request.user_id as string })
    .select(["first_name", "last_name", "image_url"])
    .getFirst();
}
