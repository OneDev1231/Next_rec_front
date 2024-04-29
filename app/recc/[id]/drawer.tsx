"use client";

import { DrawerV2, useDrawerStore } from "@/components/drawer-v2";
import { ReccCardView } from "@/components/recc-card-view";
import { ReccListsRecord } from "@/xata";
import { usePathname, useRouter } from "next/navigation";

export function ReccIdDrawer({
  userId,
  recc,
  requestId,
  callback,
}: {
  userId: string;
  recc: ReccListsRecord;
  requestId?: string;
  callback?: () => void;
}) {
  const closeCurrentDrawer = useDrawerStore((state) => state.closeCurrent);
  const pathname = usePathname();
  const router = useRouter();

  const closeCallback = async () => {
    if (callback) callback();
    else if (pathname.includes("/recc/")) router.push("/reccs");
    else closeCurrentDrawer();
  };

  return (
    <DrawerV2
      id={`RECC_BY_ID_${recc.id}`}
      trigger={null}
      open={true}
      handle={false}
      closeCallback={closeCallback}
    >
      {recc && (
        <ReccCardView
          recc={recc}
          requestId={requestId}
          userId={userId}
          footerType="EXISTING"
          callback={closeCallback}
        />
      )}
    </DrawerV2>
  );
}
