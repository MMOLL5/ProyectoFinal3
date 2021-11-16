import { CartMemDAO } from './DAOs/memory';
import { CartFSDAO } from './DAOs/fs';
import { CartAtlasDAO } from './DAOs/mongo';
import { CartMySqlDAO } from './DAOs/mysql';
import { CartSqlite3DAO } from './DAOs/sqlite3';
import { CartFireBaseDAO } from './DAOs/firebase';
import path from 'path';
import { Logger } from '../../services/logger';

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
        Logger.info('RETORNANDO INSTANCIA CLASE FS');
        const filePath = path.resolve(__dirname, './DAOs/cart.json');
        Logger.info(filePath);
        return new CartFSDAO(filePath);

      case TipoPersistencia.SQLITE3:
        Logger.info('RETORNANDO INSTANCIA CLASE SQLLITE3');
        return new CartSqlite3DAO();

      case TipoPersistencia.LocalMongo:
        Logger.info('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new CartAtlasDAO(true);
      
      case TipoPersistencia.MYSQL:
        Logger.info('RETORNANDO INSTANCIA CLASE MYSQL');
      return new CartMySqlDAO(true);

      case TipoPersistencia.Firebase:
        Logger.info('RETORNANDO INSTANCIA CLASE FIREBASE');
        return new CartFireBaseDAO(true);

      default:
        Logger.info('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new CartMemDAO();
    }
  }
}