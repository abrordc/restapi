import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    max: 255,
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Users", UserSchema);
