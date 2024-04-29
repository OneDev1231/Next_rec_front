import { getBookmarkReccById } from "@/services/reccs/get-bookmark-recc-by-id";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id") as string;

  const bookmark = await getBookmarkReccById({ id });

  return NextResponse.json(bookmark);
}
