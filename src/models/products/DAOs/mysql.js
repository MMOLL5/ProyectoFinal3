import { mySQLDB } from './db';

  export class ProductosMySqlDAO{
    productos;
  
    constructor(local = false) {
     
    }
  
    async get(id) {
      let output = [];
      console.log('id:', id);
          if(typeof id === "undefined"){
            output = await mySQLDB.from('products').select();
          } 
          else{
          output = await mySQLDB.from('products').where({ id: id }).select();
        }
        return output;
    }
  
    async add(data) {
      if (!data.nombre || !data.precio) throw new Error('invalid data');
      return await mySQLDB('products').insert(data);
    }
  
    async update(id, newProductData) {
      return await mySQLDB.from('products').where({ id }).update(data);
    }
  
    async delete(id) {
        return await mySQLDB.from('products').where({ id }).del();
    }
  
    async query(options) {
      let query = {};
  
      if (options.nombre) query.nombre = options.nombre;
  
      if (options.precio) query.precio = options.precio;

      return await mySQLDB.from('products').where(query);
    }
  }