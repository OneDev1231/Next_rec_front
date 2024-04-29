"use client";

import { DrawerV2 } from "@/components/drawer-v2";
import { ReccLoading } from "@/components/recc-loading";
import { RequestCardView } from "@/components/request-card-view";
import { RequestsRecord } from "@/xata";
import { useRouter, useSearchParams } from "next/navigation";

export function RequestIdDrawer({
  userId,
  request,
  callback,
}: {
  userId: string;
  request: RequestsRecord | null;
  callback?: () => void;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const closeCallback = async () => {
    if (callback) callback();
    else {
      const returnUrl = searchParams.get("returnUrl");
      if (returnUrl) router.push(decodeURIComponent(returnUrl));
      else router.push("/requests");
    }
  };

  return (
    <DrawerV2
      id="REQUEST_BY_ID_PAGE"
      trigger={null}
      open={true}
      handle={false}
      closeCallback={closeCallback}
    >
      {!request && (
        <div className="relative w-full h-full grow flex flex-col gap-[50px] justify-center items-center rounded p-4 pb-[57px]">
          <ReccLoading />
        </div>
      )}

      {request && (
        <RequestCardView
          type="VIEW"
          request={request}
          userId={userId}
          footerType="EXISTING"
        />
      )}
    </DrawerV2>
  );
}
