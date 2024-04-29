import { DrawerHeader } from "../drawer-header";
import { Skeleton } from "../ui/skeleton";

export function ReccLoading() {
  return (
    <div className="flex flex-col w-full gap-0">
      <DrawerHeader mode="LOADING" />

      <div className="flex flex-col gap-2 w-full pt-[20px]">
        <Skeleton className="w-1/2 h-3 rounded-lg bg-stone-200" />
        <Skeleton className="w-full h-3 rounded-lg bg-stone-200" />
        <Skeleton className="w-full h-3 rounded-lg bg-stone-200" />
      </div>

      <div className="flex flex-col gap-[40px] w-full pt-[50px]">
        <div className="flex gap-[20px] items-center">
          <Skeleton className="w-[54px] h-[80px] shrink-0 rounded bg-stone-200" />

          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="w-1/2 h-[12px] rounded-lg bg-stone-200" />
            <Skeleton className="w-4/5 h-[12px] rounded-lg bg-stone-200" />
            <Skeleton className="w-4/5 h-[12px] rounded-lg bg-stone-200" />
          </div>
        </div>

        <div className="flex gap-[20px] items-center">
          <Skeleton className="w-[54px] h-[80px] shrink-0 rounded bg-stone-200" />

          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="w-1/2 h-[12px] rounded-lg bg-stone-200" />
            <Skeleton className="w-4/5 h-[12px] rounded-lg bg-stone-200" />
            <Skeleton className="w-4/5 h-[12px] rounded-lg bg-stone-200" />
          </div>
        </div>

        <div className="flex gap-[20px] items-center">
          <Skeleton className="w-[54px] h-[80px] shrink-0 rounded bg-stone-200" />

          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="w-1/2 h-[12px] rounded-lg bg-stone-200" />
            <Skeleton className="w-4/5 h-[12px] rounded-lg bg-stone-200" />
            <Skeleton className="w-4/5 h-[12px] rounded-lg bg-stone-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
