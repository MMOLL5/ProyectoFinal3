import Server from './services/server';
import { connectDb } from './services/db';

const puerto = process.env.PORT || 8080;

connectDb().then(() => {
    console.log('DB CONECTADA');
  });

Server.listen(puerto, () => console.log(`Server up puerto ${puerto}`));