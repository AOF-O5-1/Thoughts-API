import { Schema, model, Types, SchemaTypes } from 'mongoose';
import { IThought, IReaction } from '../types/index';

const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: SchemaTypes.Date,
      default: () => new Date(),
      // Using a get function that matches Mongoose's expected types
      get: function(this: any, value: any) {
        return value ? value.toLocaleString() : '';
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: SchemaTypes.Date,
      default: () => new Date(),
      get: function(this: any, value: any) {
        return value ? value.toLocaleString() : '';
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;