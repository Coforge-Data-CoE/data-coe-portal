import mongoose, { Schema, models } from "mongoose";

const PodcastSchema = new Schema(
  {
    author: {
      name: { type: String, required: true, default: "" },
      avatar: { type: String, required: false, default: "" },
    },
    episode_name: { type: String, required: true, default: "" },
    podcast_url: { type: String, required: false, default: "" },
    description: { type: String, required: false, default: "" },
    cover_image: { type: String, required: false, default: "" },
    release: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

// Handle model re-compilation in dev/hot-reload:
// If the cached model exists but schema was previously compiled without new paths (e.g., `release`),
// drop the cached model so it can be recompiled with the latest schema.
const existing = (mongoose.models?.Podcast as mongoose.Model<any> | undefined);
if (existing) {
  const hasRelease = Object.prototype.hasOwnProperty.call(existing.schema.paths, "release");
  if (!hasRelease) {
    delete (mongoose.models as any).Podcast;
  }
}

export default models?.Podcast || mongoose.model("Podcast", PodcastSchema);
