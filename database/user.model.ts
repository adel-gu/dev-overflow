import { Schema, models, model, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const schema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional field
  bio: { type: String }, // Optional field
  picture: { type: String, required: true },
  location: { type: String }, // Optional field
  portfolioWebsite: { type: String }, // Optional field
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: 'Question' }], // Array of ObjectIds
  joinedAt: { type: Date, default: Date.now }, // Default to current date
});

const User = models.User || model<IUser>('User', schema);

export default User;
