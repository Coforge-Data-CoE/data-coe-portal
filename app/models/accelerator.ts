// models/Accelerator.ts
import mongoose, { Schema, models } from "mongoose";

const AcceleratorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    summary: { type: String, required: true, default: "" },
    iconUrl: { type: String, required: true, default: "" },
    imageUrl: { type: String, required: true, default: "" },
    videoUrl: { type: String, required: true, default: "" },
    // Store selected data offering name directly (was ObjectId ref previously)
    dataOffering: { type: String, required: false, trim: true, default: "" },
  },
  { timestamps: true }
);

export default models?.Accelerator ||
  mongoose.model("Accelerator", AcceleratorSchema);
