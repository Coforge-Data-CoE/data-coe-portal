// models/Accelerator.ts
import mongoose, { Schema, models } from "mongoose";

const CommentSchema = new Schema(
  {
    name: { type: String, required: true, trim: false, default: "" },
    comment: { type: String, required: true, trim: false, default: "" },
    createdAt: { type: Date, required: true, trim: false, default: "" },
    accelerator: { type: String, required: true, trim: false, default: "" },
  },
  { timestamps: true }
);

export default models?.Comment || mongoose.model("Comment", CommentSchema);
