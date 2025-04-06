import mongoose from "mongoose";

const Post = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: [true, "Caption is required"],
    },
    images: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        comment: {
          type: String,
          required: [true, "Comment is required"],
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, 
  }
);

const PostModel = mongoose.models.Post || mongoose.model("Post", Post);

export default PostModel;
