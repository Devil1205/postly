import { NextRequest, NextResponse as res } from "next/server";
import User from "@/models/Users";
import { UserLoginInterface } from "@/lib/interface";
import { connect } from "@/db/connection";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { storeTokenToCookies } from "@/lib/commonMethods";

export async function POST(req: NextRequest) {
  try {
    // connect db
    await connect();
    const data: UserLoginInterface = await req.json();
    const user = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });

    // if no user found or password is incorrect, return error
    if (!user || user.password !== data.password) {
      return res.json(
        {
          success: true,
          message: "User not found, please kindly check the credentials.",
        },
        { status: 404 }
      );
    }

    // in no error, store auth token to cookies
    const token = await user.generateAuthToken();
    const cookieStore = await cookies();
    await storeTokenToCookies(cookieStore, token);

    return res.json(
      {
        success: true,
        message: "Login successful",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    // if any error occur, rollback changes from db
    return res.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
