import { CartMemDAO } from './DAOs/memory';
import { CartFSDAO } from './DAOs/fs';
import { CartAtlasDAO } from './DAOs/mongo';
import { CartMySqlDAO } from './DAOs/mysql';
import { CartSqlite3DAO } from './DAOs/sqlite3';
import { CartFireBaseDAO } from './DAOs/firebase';
import path from 'path';

export let TipoPersistencia = {
  'Memoria': 'MEM',
  'FileSystem': 'FS',
  'MYSQL': 'MYSQL',
  'SQLITE3': 'SQLITE3',
  'LocalMongo': 'LOCAL-MONGO',
  'MongoAtlas': 'MONGO-ATLAS',
  'Firebase': 'FIREBASE',
}

export class NoticiasFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        console.log('RETORNANDO INSTANCIA CLASE FS');
        const filePath = path.resolve(__dirname, './DAOs/cart.json');
        console.log(filePath);
        return new CartFSDAO(filePath);

      case TipoPersistencia.SQLITE3:
        console.log('RETORNANDO INSTANCIA CLASE SQLLITE3');
        return new CartSqlite3DAO();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new CartAtlasDAO(true);
      
      case TipoPersistencia.MYSQL:
      console.log('RETORNANDO INSTANCIA CLASE MYSQL');
      return new CartMySqlDAO(true);

      case TipoPersistencia.Firebase:
        console.log('RETORNANDO INSTANCIA CLASE FIREBASE');
        return new CartFireBaseDAO(true);

      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new CartMemDAO();
    }
  }
}