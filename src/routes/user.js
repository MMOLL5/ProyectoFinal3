import { Router } from 'express';
import { UserModel } from '../models/users/users';
import { Logger } from '../services/logger';

const router = Router();

router.get('/', async (req, res) => {
  const data = await UserModel.find();
  res.json({ data });
});

router.post('/', async (req, res) => {
  const { userName, password, nombre, direccion, edad, telefono, avatar } = req.body;

  if (!userName || !password || !nombre || !direccion || !edad || !telefono || !avatar) {
    Logger.error('Invalid body fields');
    return res.status(400).json({ msg: 'Invalid fields' });
  }

  const userData = {
    userName,
    password,
    nombre,
    direccion,
    edad,
    telefono,
    avatar,
  };

  const newUser = new UserModel(userData);

  await newUser.save();

  res.json({ data: newUser });
});

export default router;