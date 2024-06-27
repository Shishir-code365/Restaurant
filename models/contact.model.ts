import mongoose, { model, mongo } from "mongoose";

export type contactType = {
firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

const ContactSchema = new mongoose.Schema<contactType>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    message: { type: String, required: true },
  },
  {timestamps: true},
);

const contactModel = model <contactType>("contact",ContactSchema);
export {contactModel};