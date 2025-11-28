// models/Request.ts
import mongoose, { Schema, models } from "mongoose";

const RequestSchema = new Schema(
  {
    name: { type: String, required: true, trim: false, default: "" },
    query: { type: String, required: true, trim: false, default: "" },
    dataOffering: { type: String, required: true, trim: false, default: "" },
    createdBy: { type: String, required: true, trim: false, default: "admin" },
    updatedBy: { type: String, required: true, trim: false, default: "admin" },
  },
  { timestamps: true }
);

export default models?.Request || mongoose.model("Request", RequestSchema);
