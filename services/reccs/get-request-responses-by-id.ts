"use server";

import { Requests, getXataClient } from "../../xata";
import { getReccListResponsesForRequest } from "./lib";

const xata = getXataClient();

export async function getRequestResponsesById({ id }: { id: string }) {
  const responses = await getReccListResponsesForRequest({ requestId: id });
  return responses;
}
