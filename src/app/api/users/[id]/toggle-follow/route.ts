import { connect } from "@/db/connection";
import User from "@/models/Users";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// toggle follow/unfollow user route
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

    const following = await User.findOne({ _id: userId, following: id });
    const follower = await User.findOne({ _id: id, followers: userId });

    // if user is not following, follow and remove follow request
    if (!following && !follower) {
      // check if friend request is sent or not
      const friendRequest = await User.findOne({
        _id: userId,
        followRequests: id,
      });

      // if friend request is not sent, retrun error
      if (!friendRequest) {
        return NextResponse.json(
          {
            success: false,
            message: "Please send the friend request first",
          },
          { status: 400 }
        );
      }
      await User.findByIdAndUpdate(userId, {
        $push: { following: id },
        $pull: { followRequests: id },
      });
      await User.findByIdAndUpdate(id, { $push: { followers: userId } });
    }
    // if user is already following, unfollow
    else {
      await User.findByIdAndUpdate(userId, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: userId } });
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      {
        success: true,
        message: "User follow status updated successfully",
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
