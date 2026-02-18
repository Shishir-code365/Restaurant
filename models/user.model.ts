//User Model
import mongoose, { model } from "mongoose";

type userTypes = {
  email: string;
  passwordHash: string;
  username: string;
};

const userSchema = new mongoose.Schema<userTypes>({
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  username: String
},
    { timestamps: true }
);

const userModel = model<userTypes>("user", userSchema);
export { userModel };
