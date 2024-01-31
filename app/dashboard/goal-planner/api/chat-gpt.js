// /app/dashboard/goalsetting/api/chat-gpt.js

import { NextResponse } from "next/server";

export default async function handler(request) {
    console.log("API route reached!");
  if (request.method === "POST") {
    const data = await request.json(); // Get JSON data from the request body

    // Your processing logic here...
    const result = {
      name: "IT WORKS!!!",
      receivedData: data,
    };

    return NextResponse.json(result);
  }

  // If the request method is not POST, return an error response
  return NextResponse.error({
    status: 405,
    message: "Method Not Allowed",
  });
}
