import mongoose, { Schema, Model, Document } from "mongoose";

interface IToolkitService extends Document {
  file: string;
  label: string;
}

const ToolkitServiceSchema = new Schema<IToolkitService>({
  file: { type: String, required: true },
  label: { type: String, required: true },
});

const ToolkitService: Model<IToolkitService> =
  mongoose.models.ToolkitService ||
  mongoose.model<IToolkitService>("ToolkitService", ToolkitServiceSchema);

export default ToolkitService;
