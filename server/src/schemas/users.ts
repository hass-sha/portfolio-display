import mongoose from 'mongoose';
import {PasswordSchema} from './password';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: PasswordSchema,
  displayName: String,
  email: String
});

export const Users = mongoose.model('users', userSchema);
