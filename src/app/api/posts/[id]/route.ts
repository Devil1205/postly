import { connect } from "@/db/connection";
import { NextRequest, NextResponse } from "next/server";
import Posts from "@/models/Posts";
import mongoose from "mongoose";

// get post with id route
export async function GET(req: NextRequest, params: { id: string }) {
  try {
    await connect();
    const { id } = params;
    const userId = req.headers.get("x-user-id");

    const post = await Posts.findById(id);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        { status: 404 }
      );
    }

    // if user is not the owner of the post, return error
    if (post.user.toString() !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to view this post",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        post,
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

// update post with id route
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await connect();
    const { id } = await params;
    const data = await req.json();
    const userId = req.headers.get("x-user-id");

    const post = await Posts.findById(id);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        { status: 404 }
      );
    }

    // if user is not the owner of the post, return error
    if (post.user.toString() !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to edit this post",
        },
        { status: 401 }
      );
    }

    await Posts.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      {
        success: true,
        message: "Post updated successfully",
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

// delete post with id route
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await connect();
    const { id } = await params;
    const userId = req.headers.get("x-user-id");

    const post = await Posts.findById(id);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        { status: 404 }
      );
    }

    // if user is not the owner of the post, return error
    if (post.user.toString() !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to delete this post",
        },
        { status: 401 }
      );
    }

    await Posts.findByIdAndDelete(id);

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      {
        success: true,
        message: "Post deleted successfully",
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
