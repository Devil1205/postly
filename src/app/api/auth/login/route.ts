import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest) {
  const body = req.body;
  console.log(body);
  return res.json(
    {
      success: true,
      message: "Registration successful",
    },
    { status: 200 }
  );
}
