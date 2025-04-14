import { connect } from "@/db/connection";
import { NextRequest, NextResponse } from "next/server";
import Posts from "@/models/Posts";
import User from "@/models/Users";

// get all posts of a user route
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();

    const userId = req.headers.get("x-user-id");
    const { id } = await params;

    // check if user is following the user whose posts are being fetched. If yes, then show all posts, else show only public posts
    const isFollowing = await User.findOne({ _id: userId, following: id });
    const privacy = isFollowing ? true : false;

    const posts = await Posts.find({ privacy });

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
