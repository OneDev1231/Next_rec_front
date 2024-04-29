"use server";

import { currentUser } from "@clerk/nextjs";

import { getXataClient } from "../../xata";

const xata = getXataClient();

export async function createRequestService({
  promptText,
}: {
  promptText: string;
}) {
  const user = await currentUser();
  if (!user) throw new Error("NO_USER");

  return await xata.db.requests.create({
    user_id: user.id,
    user: user.id,
    recc_list_responses: [],
    title: "This is a new title!",
    prompt_text: promptText,
    status: "draft",
  });
}
