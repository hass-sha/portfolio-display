import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PasswordSchema = new Schema({
  salt: String,
  hash: String,
  iterations: Number
});

export const PasswordModel = mongoose.model('password', PasswordSchema);
