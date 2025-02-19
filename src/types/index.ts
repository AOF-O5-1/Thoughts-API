import { Document, Types } from 'mongoose';

export interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
  
}

export interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[] | IThought[];
  friends: Types.ObjectId[] | IUser[];
  friendCount: number;
}