import Server from './services/server';
import { connectDb } from './services/db';
import { Logger } from './services/logger';

connectDb().then(() => {
    console.log('DB CONECTADA');
  });

const puerto = process.env.PORT || 8080;
Server.listen(puerto, () => console.log(`Server up puerto ${puerto}`));