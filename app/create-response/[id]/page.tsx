import CreateResponseComponent from "@/components/create-response";

export const runtime = "edge"; // 'nodejs' (default) | 'edge'

export default async function CreateResponsePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col">
      <CreateResponseComponent requestId={params.id} />
    </div>
  );
}
