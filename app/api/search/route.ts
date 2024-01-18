import { vectors } from "./data";

export async function GET() {
  return Response.json(vectors);
}

export async function POST(request: Request) {
  const query = await request.json();
  return new Response(JSON.stringify(vectors), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201
  });
}
