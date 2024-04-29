import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function AvatarAndName({
  avatarLetters,
  avatarImage,
  avatarName,
}: {
  avatarLetters: string;
  avatarImage?: string;
  avatarName: string;
}) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar className="w-[24px] h-[24px]">
        <AvatarImage src={avatarImage} />
        <AvatarFallback className="font-sans">{avatarLetters}</AvatarFallback>
      </Avatar>

      <div className="font-sans font-medium text-sm text-stone-800">
        {avatarName}
      </div>
    </div>
  );
}
