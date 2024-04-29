"use server"

import { Requests, getXataClient } from "../../xata";

const xata = getXataClient();

export async function updateRequestById({ id, promptText, status }: {id: string, promptText?: string, status?: "draft" | "active" }) {
  const mapping: Requests = { id };

  if (promptText) mapping.prompt_text = promptText;
  if (status) mapping.status = status;

  const record = await xata.db.requests.update(id, mapping);
  return record;
}