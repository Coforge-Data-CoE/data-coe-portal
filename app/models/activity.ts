import mongoose, { Schema, Model, Document } from "mongoose";

interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  meta?: Record<string, any>;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    meta: { type: Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Activity: Model<IActivity> =
  mongoose.models.Activity ||
  mongoose.model<IActivity>("Activity", ActivitySchema);

export default Activity;
