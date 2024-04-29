"use client";

import { ReccIdDrawer } from "@/app/recc/[id]/drawer";
import { ReactNode, useState } from "react";
import useSWR from "swr";

const reccFetcher = async ({ url, id }: { url: string; id: string }) => {
  const query = await fetch(`${url}?id=${id}`);
  const response = await query.json();

  return response;
};

const useRecc = ({ id }: { id: string }) => {
  const { data: recc } = useSWR(["/api/recc", id], ([url, id]) =>
    reccFetcher({ url, id })
  );

  return { recc };
};

export function ReccIdContainerWithQuery({
  userId,
  reccId,
  requestId,
  children,
}: {
  userId: string;
  reccId: string;
  requestId?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { recc } = useRecc({ id: reccId });

  const press = () => {
    setOpen(true);
  };

  const drawerCallback = () => {
    setOpen(false);
  };

  return (
    <div className="w-full">
      {open && recc && (
        <ReccIdDrawer
          userId={userId}
          recc={recc}
          requestId={requestId}
          callback={drawerCallback}
        />
      )}

      <div className="w-full cursor-auto" onClick={press}>
        {children}
      </div>
    </div>
  );
}
