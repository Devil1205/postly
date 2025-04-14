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
        default: [],
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    comments: {
      type: [
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
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    privacy: {
      type: Boolean,
      default: false,
      comment: "true for private, false for public",
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.models.Post || mongoose.model("Post", Post);

export default PostModel;
