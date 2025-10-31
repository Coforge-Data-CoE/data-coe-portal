// models/dataOffering.ts
import mongoose, { Schema, models } from "mongoose";

const DataOfferingSchema = new Schema(
  {
    offerings: [
      {
        _id: { type: Schema.Types.ObjectId, auto: true },
        name: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);

export default models?.DataOffering || mongoose.model("DataOffering", DataOfferingSchema);
