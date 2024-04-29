"use server";

import { FilledOutRequest } from "@/types";
import { RequestsRecord, getXataClient } from "../../xata";
import { assembleRequests } from "./lib";

const xata = getXataClient();

export async function getRequestById({ id }: { id: string }) {
  const request = (await xata.db.requests
    .filter({ id })
    .getFirst({ consistency: "eventual" })) as RequestsRecord;
  const adjustedRequests = await assembleRequests({ requests: [request] });

  return adjustedRequests[0] as FilledOutRequest;
}
