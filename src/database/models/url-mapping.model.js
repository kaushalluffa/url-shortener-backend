import { Schema, model } from "mongoose";



// Create the schema for the URL mapping
const UrlMappingSchema = new Schema({
  short_url: { type: String, required: true, unique: true },
  long_url: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  expired_on: { type: Date, required: false },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  click_count: { type: Number, default: 0 },
});

// Create the model for the URL mapping
const UrlMapping = model("UrlMapping", UrlMappingSchema);

export default UrlMapping;
