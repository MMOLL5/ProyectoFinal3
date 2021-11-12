import { sqliteDB } from './db';

  export class ProductosSqlite3DAO{
    productos;
  
    constructor(local = false) {
     
    }
  
    async get(id) {
      let output = [];
      console.log('id:', id);
          if(typeof id === "undefined"){
            output = await sqliteDB.from('products').select();
          } 
          else{
          output = await sqliteDB.from('products').where({ id: id }).select();
        }
        return output;
    }
  
    async add(data) {
      if (!data.nombre || !data.precio) throw new Error('invalid data');
      return await sqliteDB('products').insert(data);
    }
  
    async update(id, data) {
      return await sqliteDB.from('products').where({ id }).update(data);
    }
  
    async delete(id) {
        return await sqliteDB.from('products').where({ id }).del();
    }
  
    async query(options) {
      let query = {};
  
      if (options.nombre) query.nombre = options.nombre;
  
      if (options.precio) query.precio = options.precio;

      return await sqliteDB.from('products').where(query);
    }
  }