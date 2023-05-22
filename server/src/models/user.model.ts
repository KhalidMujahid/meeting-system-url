import { Schema, model, Document } from "mongoose";

export interface IUser {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  meeting_link: string;
}

export interface IUserDoc extends IUser, Document {}

const obj = {
  type: String,
  required: true,
  trim: true,
};

const UserSchema: Schema<IUserDoc> = new Schema<IUserDoc>(
  {
    first_name: obj,
    last_name: obj,
    phone_number: obj,
    email: obj,
    meeting_link: obj,
  },
  { timestamps: true }
);

const User = model<IUserDoc>("User", UserSchema);

export default User;
