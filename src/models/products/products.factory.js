import { ProductosMemDAO } from './DAOs/memory';
import { ProductosFSDAO } from './DAOs/fs';
import { ProductosAtlasDAO } from './DAOs/mongo';
import { ProductosMySqlDAO } from './DAOs/mysql';
import { ProductosSqlite3DAO } from './DAOs/sqlite3';
import { ProductosFireBaseDAO } from './DAOs/firebase';
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
        const filePath = path.resolve(__dirname, './DAOs/products.json');
        console.log(filePath);
        return new ProductosFSDAO(filePath);

      case TipoPersistencia.SQLITE3:
        console.log('RETORNANDO INSTANCIA CLASE SQLLITE3');
        return new ProductosSqlite3DAO();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new ProductosAtlasDAO(true);
      
      case TipoPersistencia.MYSQL:
      console.log('RETORNANDO INSTANCIA CLASE MYSQL');
      return new ProductosMySqlDAO(true);

      case TipoPersistencia.Firebase:
        console.log('RETORNANDO INSTANCIA CLASE FIREBASE');
        return new ProductosFireBaseDAO(true);

      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new ProductosMemDAO();
    }
  }
}