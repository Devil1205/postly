import { NextRequest, NextResponse as res } from "next/server";
import User from "@/models/Users";
import { UserSignupInterface } from "@/lib/interface";
import { connect } from "@/db/connection";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // connect db
    await connect();
    const data: UserSignupInterface = await req.json();
    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });

    // if email already registered, return error
    if (existingUser) {
      return res.json(
        {
          success: true,
          message: "Email or Username already registered, please kindly login.",
        },
        { status: 409 }
      );
    }

    // in no error, add user to db
    await User.create(data);
    await session.commitTransaction();
    session.endSession();
    return res.json(
      {
        success: true,
        message: "Registration successful",
      },
      { status: 200 }
    );
  } catch (error: any) {
    // if any error occur, rollback changes from db
    await session.abortTransaction();
    session.endSession();
    return res.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
