import { getRequestById } from "@/services/reccs/get-request-by-id";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id") as string;

  const requestItem = await getRequestById({ id });

  return NextResponse.json(requestItem);
}
