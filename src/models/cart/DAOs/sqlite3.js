import { sqliteDB } from './db';

  export class CartSqlite3DAO{
    cart;
  
    constructor(local = false) {
     
    }
  
    async get(id) {
      let output = [];
      console.log('id:', id);
          if(typeof id === "undefined"){
            output = await sqliteDB.from('cart').select();
          } 
          else{
          output = await sqliteDB.from('cart').where({ id: id }).select();
        }
        return output;
    }
  
    async add(data) {
      if (!data.product.id) throw new Error('invalid data');
      return await sqliteDB('cart').insert(data);
    }
  
    async delete(id) {
        return await sqliteDB.from('cart').where({ id }).del();
    }

  }