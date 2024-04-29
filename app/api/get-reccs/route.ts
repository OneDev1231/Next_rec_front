export async function GET() {
  return Response.json({ method: "GET" });
}

export async function POST() {
  return Response.json({ method: "POST" }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': "true",
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}