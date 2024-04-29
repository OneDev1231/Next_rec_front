import { getAvatarLetters, shareSheet } from "@/lib/utils";
import { AvatarAndName } from "../avatar-and-name";
import { ReccContent } from "../recc-content";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useDrawerStore } from "../drawer-v2";

export function CreateReccShare({ recc }: { recc: any }) {
  const setOpen = useDrawerStore((state) => state.setOpen);
  const avatarName = `${recc.creator.first_name} ${
    recc.creator?.last_name || ""
  }`;
  const avatarImage = recc.creator.image_url;
  const avatarLetters = getAvatarLetters({
    firstName: recc.creator.first_name,
    lastName: recc.creator?.last_name || "",
  });

  return (
    <div className="flex flex-col gap-[20px] w-full p-[16px] pb-[24px]">
      <div className="flex flex-col w-full justify-center items-center">
        <div>Success</div>
        <img src="/wave-red.svg" className="w-[38px]" />
      </div>

      <div className="flex flex-col gap-[12px] w-full bg-stone-50 p-[16px] pb-0 rounded">
        <AvatarAndName
          avatarLetters={avatarLetters}
          avatarImage={avatarImage}
          avatarName={avatarName}
        />

        <ReccContent
          imageUrl={recc.reccItems[0]?.image_url}
          title={recc.title}
          description={recc.prompt_text}
        />

        {/* Footer */}
        <div className="flex justify-between items-center py-[10px] border-t border-stone-100">
          <div className="font-sans text-sm text-stone-800">
            {recc.recc_items?.length || 0} reccs
          </div>

          <Link href={`/recc/${recc.id}`}>
            <Edit className="stroke-stone-600 cursor-pointer" />
          </Link>
        </div>
      </div>

      <div className="flex gap-[16px]">
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setOpen({ id: "CREATE_RECC", value: false })}
        >
          Close
        </Button>

        <Button
          variant="destructive"
          className="w-full"
          onClick={() =>
            shareSheet({ url: `${window.location.origin}/recc/${recc.id}` })
          }
        >
          Share
        </Button>
      </div>
    </div>
  );
}
