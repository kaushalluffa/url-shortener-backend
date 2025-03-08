import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  user_id: string;
  name: string;
  email: string;
  password: string;
  refreshToken: Array<string>;
}

const UserSchema: Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    auto: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: Array<String> },
});

const User = model<IUser>("User", UserSchema);

export default User;
