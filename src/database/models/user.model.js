import { model, Schema } from "mongoose";


const UserSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    auto: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: Array},
});

const User = model("User", UserSchema);

export default User;
