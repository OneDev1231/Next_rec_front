import { getRequests } from "@/services/reccs/get-requests";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const requests = await getRequests({ offset });

  return NextResponse.json(requests);
}
