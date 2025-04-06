import { connect } from "@/db/connection";
import { NextRequest, NextResponse } from "next/server";
import Posts from "@/models/Posts";
import mongoose from "mongoose";

// get all posts route
export async function GET(req: NextRequest) {
  try {
    await connect();

    const posts = await Posts.find();

    return NextResponse.json(
      {
        success: true,
        posts,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// create new post route
export async function POST(req: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await connect();
    const data = await req.json();

    await Posts.create(data);
    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      {
        success: true,
        message: "Post created successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    // if any error occur, rollback changes from db
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
