import { Schema, models, model, Document } from 'mongoose';

export interface ITag extends Document {
  name: string;
  description: string;
  question: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const schema = new Schema<ITag>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  question: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdOn: { type: Date, default: Date.now },
});

const Tag = models.Tag || model<ITag>('Tag', schema);

export default Tag;
