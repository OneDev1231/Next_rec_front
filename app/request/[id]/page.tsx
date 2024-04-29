import { getRequestById } from "@/services/reccs/get-request-by-id";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import { Feed } from "./feed";
import { RequestIdDrawer } from "./drawer";
import { redirect } from "next/navigation";

export const runtime = "edge"; // 'nodejs' (default) | 'edge'

export default async function RequestPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const request = await getRequestById({ id });

  if (!request) redirect("/requests");

  const user = await currentUser();
  const userId = user?.id || "";

  return (
    <>
      <Suspense fallback={null}>
        <Feed userId={userId} offset={0} />
      </Suspense>

      <RequestIdDrawer userId={userId} request={request} />
    </>
  );
}
