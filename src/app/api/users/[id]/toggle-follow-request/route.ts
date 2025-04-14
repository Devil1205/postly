import { connect } from "@/db/connection";
import User from "@/models/Users";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// toggle accept/reject follow user request route
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let session;
  try {
    await connect();
    session = await mongoose.startSession();
    session.startTransaction();
    const { id } = await params;
    const userId = req.headers.get("x-user-id");

    if (id === userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot follow yourself",
        },
        { status: 400 }
      );
    }

    const followRequestSent = await User.findOne({
      _id: id,
      followRequests: userId,
    });

    // if follow request is not sent, send it
    if (!followRequestSent) {
      await User.findByIdAndUpdate(id, { $push: { followRequests: userId } });
    }
    // if follow request is sent, cancel it
    else {
      await User.findByIdAndUpdate(id, { $pull: { followRequests: userId } });
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      {
        success: true,
        message: "User follow request updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    await session?.abortTransaction();
    session?.endSession();
    NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
