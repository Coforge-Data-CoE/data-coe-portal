// models/Accelerator.ts
import mongoose, { Schema, models } from "mongoose";

const AcceleratorSchema = new Schema(
  {
    name: { type: String, required: true, trim: false, default: "" },
    description: { type: String, required: false, trim: false, default: "" },
    summary: { type: String, required: true, trim: false, default: "" },
    iconUrl: { type: String, required: true, trim: false, default: "" },
    imageUrl: { type: String, required: false, trim: false, default: "" },
    videoUrl: { type: String, required: false, trim: false, default: "" },
    // Store selected data offering name directly (was ObjectId ref previously)
    dataOffering: { type: String, required: true, trim: false, default: "" },
    dockerProjectName: { type: String, required: false, trim: false, default: "" },
    createdBy: { type: String, required: true, trim: false, default: "admin" },
    updatedBy: { type: String, required: true, trim: false, default: "admin" },
  },
  { timestamps: true }
);

export default models?.Accelerator ||
  mongoose.model("Accelerator", AcceleratorSchema);
