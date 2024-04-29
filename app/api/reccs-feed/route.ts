import { getMyFeed } from "@/services/reccs/get-my-feed";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const recs = await getMyFeed({ offset });

  return NextResponse.json(recs);
}
