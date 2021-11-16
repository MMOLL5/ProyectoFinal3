import { ProductosMemDAO } from './DAOs/memory';
import { ProductosFSDAO } from './DAOs/fs';
import { ProductosAtlasDAO } from './DAOs/mongo';
import { ProductosMySqlDAO } from './DAOs/mysql';
import { ProductosSqlite3DAO } from './DAOs/sqlite3';
import { ProductosFireBaseDAO } from './DAOs/firebase';
import path from 'path';
import { Logger } from '../../services/logger';
import { loggers } from 'winston';

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
        const filePath = path.resolve(__dirname, './DAOs/products.json');
        Logger.info(filePath);
        return new ProductosFSDAO(filePath);

      case TipoPersistencia.SQLITE3:
        Logger.info('RETORNANDO INSTANCIA CLASE SQLLITE3');
        return new ProductosSqlite3DAO();

      case TipoPersistencia.LocalMongo:
        Logger.info('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new ProductosAtlasDAO(true);
      
      case TipoPersistencia.MYSQL:
        Logger.info('RETORNANDO INSTANCIA CLASE MYSQL');
      return new ProductosMySqlDAO(true);

      case TipoPersistencia.Firebase:
        Logger.info('RETORNANDO INSTANCIA CLASE FIREBASE');
        return new ProductosFireBaseDAO(true);

      default:
        Logger.info('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new ProductosMemDAO();
    }
  }
}