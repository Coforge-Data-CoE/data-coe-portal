import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  name?: string;
  oid?: string;
  image?: string;
  isAdmin?: boolean;
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  oid: { type: String },
  image: { type: String },
  isAdmin: { type: Boolean, default: false },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
