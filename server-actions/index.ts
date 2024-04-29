"use server";

import { bookmarkReccById } from "@/services/reccs/bookmark-recc-by-id";
import { createReccService } from "@/services/reccs/create";
import { createRequestService } from "@/services/reccs/create-request";
import { createResponseService } from "@/services/reccs/create-response";
import { deleteReccById } from "@/services/reccs/delete-recc-by-id";
import { deleteReccItemById } from "@/services/reccs/delete-recc-item-by-id";
import { deleteRequestById } from "@/services/reccs/delete-request-by-id";
import { getReccById } from "@/services/reccs/get-by-id";
import { getCreatorById } from "@/services/reccs/get-creator-by-id";
import { getRequestById } from "@/services/reccs/get-request-by-id";
import { getRequestResponsesById } from "@/services/reccs/get-request-responses-by-id";
import { removeBookmarkReccById } from "@/services/reccs/remove-bookmark-recc-by-id";
import { updateReccById } from "@/services/reccs/update-by-id";
import { updateReccItemById } from "@/services/reccs/update-item-by-id";
import { updateRequestById } from "@/services/reccs/update-request-by-id";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRecc({ promptText }: { promptText: string }) {
  // Run service call to create new recc
  const newRecc = await createReccService({ promptText });
  // Fully assemble new Recc with Recc items and Creator details
  const fullyQueriedRecc = await getReccById({ id: newRecc?.id || "" });

  // Revalidate data cacheing here on the create page
  revalidatePath("/", "layout");

  // Return newly created recc to the client that called the action
  return fullyQueriedRecc;
}

export async function createRequest({ promptText }: { promptText: string }) {
  // Run service call to create new recc
  const newRequest = await createRequestService({ promptText });
  // Fully assemble new Recc with Recc items and Creator details
  const fullyQueriedRequest = await getRequestById({
    id: newRequest?.id || "",
  });

  // Revalidate data cacheing here on the create page
  revalidatePath("/", "layout");

  // Return newly created recc to the client that called the action
  return fullyQueriedRequest;
}

export async function createResponse({
  promptText,
  requestId,
}: {
  promptText: string;
  requestId: string;
}) {
  // Run service call to create new recc
  const newResponse = await createResponseService({ promptText, requestId });
  // Fully assemble new Recc with Recc items and Creator details
  const fullyQueriedRequest = await getReccById({ id: newResponse?.id || "" });

  // Revalidate data cacheing here on the create page
  revalidatePath("/");

  // Return newly created recc to the client that called the action
  return fullyQueriedRequest;
}

export async function updateRecc({
  id,
  title,
  promptText,
  status,
}: {
  id: string;
  title?: string;
  promptText?: string;
  status?: "draft" | "active";
}) {
  "use server";
  const updatedRecc = await updateReccById({ id, title, promptText, status });

  revalidatePath("/", "layout");

  return updatedRecc;
}

export async function updateRequest({
  id,
  promptText,
  status,
}: {
  id: string;
  promptText?: string;
  status?: "draft" | "active";
}) {
  "use server";
  const updatedRequest = await updateRequestById({ id, promptText, status });

  revalidatePath("/", "layout");

  return updatedRequest;
}

export async function updateReccItem({
  id,
  title,
  description,
}: {
  id: string;
  title?: string;
  description?: string;
}) {
  const updatedReccItem = await updateReccItemById({ id, title, description });

  revalidatePath("/", "page");

  return updatedReccItem;
}

export async function deleteRecc({ id }: { id: string }) {
  await deleteReccById({ id });

  revalidatePath("/");
}

export async function deleteRequest({ id }: { id: string }) {
  await deleteRequestById({ id });
}

export async function deleteReccItem({ id }: { id: string }) {
  await deleteReccItemById({ id });

  revalidatePath("/", "page");
}

export async function bookmarkRecc({ id }: { id: string }) {
  await bookmarkReccById({ reccListId: id });

  revalidatePath("/recc/[id]", "page");
}

export async function removeBookmarkRecc({ id }: { id: string }) {
  await removeBookmarkReccById({ reccListId: id });

  revalidatePath("/", "page");
}

export async function loadMoreReccFeed({ offset }: { offset: number }) {
  revalidatePath("/", "layout");
}

export async function getRequestByIdAction({ id }: { id: string }) {
  const fullyQueriedRequest = await getRequestById({
    id: id || "",
  });

  return fullyQueriedRequest;
}

export async function getRequestResponsesByIdAction({ id }: { id: string }) {
  return await getRequestResponsesById({
    id,
  });
}

export async function getCreatorByIdAction({ id }: { id: string }) {
  return await getCreatorById({
    id,
  });
}
