import { Mongoose, Document } from 'mongoose';
import { Express } from 'express';

type UserDocument = Document & {
  username: string;
  password: string;
  email?: string;
};

export default (app: Express) => {
  const db: Mongoose = app.get('mongooseClient');
  const { Schema } = db;

  const users = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
  });

  return db.model<UserDocument>('users', users);
};
