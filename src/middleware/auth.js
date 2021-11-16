import passport from 'passport';
import passportLocal from 'passport-local';
import { UserModel } from '../models/users/users';
import { Logger } from '../services/logger';

const LocalStrategy = passportLocal.Strategy;

const strategyOptions = {
  usernameField: 'userName',
  passwordField: 'password',
  passReqToCallback: true,
};

const loginFunc = async (req, userName, password, done) => {
  const user = await UserModel.findOne({ userName });

  if (!user) {
    return done(null, false, { message: 'User does not exist' });
  }
  if (!user.isValidPassword(password)) {
    return done(null, false, { message: 'Password is not valid.' });
  }
  Logger.info('SALIO TODO BIEN');
  return done(null, user);
};

const signUpFunc = async (req, userName, password, done) => {
  try {
    const { userName, password, nombre, direccion, edad, telefono, avatar} = req.body;
    Loger.info(req.body);
    if (!userName || !password || !nombre || !direccion || !edad || !telefono || !avatar) {
      Logger.info('Invalid body fields');
      return done(null, false);
    }

    const query = {
      $or: [{ nombre: userName }],
    };

    Logger.info(query);
    const user = await UserModel.findOne(query);

    if (user) {
      Logger.info('User already exists');
      Logger.info(user);
      return done(null, false, 'User already exists');
    } else {
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

      return done(null, newUser);
    }
  } catch (error) {
    done(error);
  }
};

passport.use('login', new LocalStrategy(strategyOptions, loginFunc));
passport.use('signup', new LocalStrategy(strategyOptions, signUpFunc));

passport.serializeUser((user, done) => {
  // console.log(user);
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId, function (err, user) {
    done(err, user);
  });
});

export const isLoggedIn = (req, res, done) => {
  if (!req.user) return res.status(401).json({ msg: 'Unathorized' });

  done();
};

export default passport;