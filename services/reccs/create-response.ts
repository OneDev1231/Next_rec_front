"use server"

import { currentUser } from "@clerk/nextjs";

import { getXataClient } from "../../xata";
import { createReccService } from "./create";

const xata = getXataClient();

export async function createResponseService({ promptText, requestId }: { promptText: string, requestId: string }){
  const user = await currentUser();
  if (!user) throw new Error("NO_USER");

  return await createReccService({ promptText, requestId });
}