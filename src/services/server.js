import express from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';
import { ErrorRequestHandler } from 'express';
import session from 'express-session';
import passport from '../middleware/auth';
import { Logger } from './logger';
import { loggers } from 'winston';

const app = express();

app.use(
  session({
    secret: 'your secret line of secretness',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {

  Logger.info(`REQ.SESSION =>\n${JSON.stringify(req.session)}`);
  Logger.info(`REQ.USER ===> ${JSON.stringify(req.user)}`);

  /**Passport ofrece este metodo para saber si un usuario esta autenticado o no. Devuelve true o false */
  Logger.info(`REQ.AUTHENTICATE =>\n${JSON.stringify(req.isAuthenticated())}`);

  next();
});

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.use(express.json());
app.use('/', apiRouter);

//https://stackoverflow.com/questions/50218878/typescript-express-error-function
const errorHandler = (err, req, res, next) => {
    Logger.error(`HUBO UN ERROR ${err.message}`);
    res.status(500).json({
      err: err.message,
    });
  };

app.use(errorHandler);

const appServer = new http.Server(app);

export default appServer;