import { StackedImage } from "../stacked-image";

export function ReccContent({
  imageUrl,
  title,
  description,
}: {
  imageUrl: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-[16px] items-center">
      <StackedImage imageUrl={imageUrl} />

      <div className="flex flex-col ">
        <div className="font-sans text-regular text-stone-800 font-semibold">
          {title}
        </div>
        <div className="font-sans text-sm text-stone-600">{description}</div>
      </div>
    </div>
  );
}
