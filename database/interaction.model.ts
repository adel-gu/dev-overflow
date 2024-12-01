import { Schema, models, model, Document } from 'mongoose';

export interface IInteraction extends Document {
  action: string;
  user: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  answer: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  createdAt: Date;
}

const schema = new Schema<IInteraction>({
  action: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  createdAt: { type: Date, default: Date.now },
});

const Interaction =
  models.Interaction || model<IInteraction>('Interaction', schema);

export default Interaction;
