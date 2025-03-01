import { Schema, model, Document } from "mongoose";

// Define the interface for the URL mapping document
export interface IUrlMapping extends Document {
  short_url: string;
  long_url: string;
  created_at: Date;
  expired_on: Date;
  user_id: Schema.Types.ObjectId;
  click_count: number;
}

// Create the schema for the URL mapping
const UrlMappingSchema = new Schema<IUrlMapping>({
  short_url: { type: String, required: true, unique: true },
  long_url: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  expired_on: { type: Date, required: false },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  click_count: { type: Number, default: 0 },
});

// Create the model for the URL mapping
const UrlMapping = model<IUrlMapping>("UrlMapping", UrlMappingSchema);

export default UrlMapping;
