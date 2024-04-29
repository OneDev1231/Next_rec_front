import { getCreatorById } from "@/services/reccs/get-creator-by-id";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id") as string;

  const creator = await getCreatorById({ id });

  return NextResponse.json(creator);
}
