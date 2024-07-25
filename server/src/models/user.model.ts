import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
    },
    full_name: {
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
