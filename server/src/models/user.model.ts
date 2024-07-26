import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
