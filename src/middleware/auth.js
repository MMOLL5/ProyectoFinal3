import passport from 'passport';
import passportLocal from 'passport-local';
import { UserModel } from '../models/users/users';

const LocalStrategy = passportLocal.Strategy;

const strategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const loginFunc = async (req, email, password, done) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return done(null, false, { message: 'User does not exist' });
  }
  if (!user.isValidPassword(password)) {
    return done(null, false, { message: 'Password is not valid.' });
  }
  console.log('SALIO TODO BIEN');
  return done(null, user);
};

const signUpFunc = async (req, email, password, done) => {
  try {
    const { email, password, nombre, direccion, edad, telefono, avatar} = req.body;
    console.log(req.body);
    if (!username || !password || !email || !firstName || !lastName) {
      console.log('Invalid body fields');
      return done(null, false);
    }

    const query = {
      $or: [{ nombre: nombre }, { email: email }],
    };

    console.log(query);
    const user = await UserModel.findOne(query);

    if (user) {
      console.log('User already exists');
      console.log(user);
      return done(null, false, 'User already exists');
    } else {
      const userData = {
        email,
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