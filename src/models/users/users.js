import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

export const UserModel = mongoose.model('user', UserSchema);