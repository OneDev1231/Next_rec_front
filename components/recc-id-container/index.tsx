"use client";

import { ReccIdDrawer } from "@/app/recc/[id]/drawer";
import { ReccListsRecord } from "@/xata";
import { ReactNode, useState } from "react";

export function ReccIdContainer({
  userId,
  recc,
  children,
}: {
  userId: string;
  recc: ReccListsRecord;
  children: ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const press = () => {
    setOpen(true);
  };

  const drawerCallback = () => {
    setOpen(false);
  };

  return (
    <div className="w-full">
      {open && (
        <ReccIdDrawer userId={userId} recc={recc} callback={drawerCallback} />
      )}

      <div className="w-full cursor-auto" onClick={press}>
        {children}
      </div>
    </div>
  );
}
