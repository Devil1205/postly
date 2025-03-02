import { NextRequest, NextResponse as res } from "next/server";

export async function POST(req: NextRequest) {
  console.log(req.body);
  return res.json(
    {
      success: true,
      message: "Registration successful",
    },
    { status: 200 }
  );
}
