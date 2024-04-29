import { getReccById } from "@/services/reccs/get-by-id";
import { currentUser } from "@clerk/nextjs";
import { Feed } from "./feed";
import { Suspense } from "react";
import { ReccIdDrawer } from "./drawer";
import { redirect } from "next/navigation";

export default async function ReccPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const recc = await getReccById({ id });
  const user = await currentUser();
  const userId = user?.id || "";

  if (!recc) redirect("/reccs");

  return (
    <>
      <Suspense fallback={null}>
        <Feed />
      </Suspense>

      <ReccIdDrawer userId={userId} recc={recc} />
    </>
  );
}
