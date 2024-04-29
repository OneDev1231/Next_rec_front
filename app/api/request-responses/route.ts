import { getRequestResponsesById } from "@/services/reccs/get-request-responses-by-id";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id") as string;

  const responses = await getRequestResponsesById({ id });

  return NextResponse.json(responses);
}
