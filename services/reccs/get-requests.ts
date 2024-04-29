"use server";

import { RequestsRecord, getXataClient } from "../../xata";
import { currentUser } from "@clerk/nextjs";

const xata = getXataClient();

type Mode = "DEFAULT" | "MINE";

export async function getRequests({
  mode = "DEFAULT",
  offset = 0,
}: {
  mode?: Mode;
  offset?: number;
}) {
  const user = await currentUser();
  let requestParts = xata.db.requests
    .sort("xata.createdAt", "desc")
    .select(["*", "user.*"]);

  if (mode === "MINE")
    requestParts = requestParts.filter({ user_id: user?.id });

  const requests = await requestParts
    .filter({ status: "active" })
    .getPaginated({
      pagination: { size: 100, offset },
      consistency: "eventual",
    });

  // Make sure a user account is tied to the request
  const filteredRequests = requests.records.filter((request) => request.user);

  return filteredRequests as RequestsRecord[];
}
