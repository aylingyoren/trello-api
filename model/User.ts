import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: String,
      default: "user",
    },
    Admin: String,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: String,
});

export default mongoose.model("User", userSchema);
