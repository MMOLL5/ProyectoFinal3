import { mySQLDB } from './db';
import { Logger } from '../../../services/logger';

  export class CartMySqlDAO{
    cart;
  
    constructor(local = false) {
     
    }
  
    async get(id) {
      let output = [];
      Logger.info('id:', id);
          if(typeof id === "undefined"){
            output = await mySQLDB.from('cart').select();
          } 
          else{
          output = await mySQLDB.from('cart').where({ id: id }).select();
        }
        return output;
    }
  
    async add(data) {
      if (!data.prpoduct.id) throw new Error('invalid data');
      return await mySQLDB('cart').insert(data);
    }
  
    async delete(id) {
        return await mySQLDB.from('cart').where({ id }).del();
    }
  
  }