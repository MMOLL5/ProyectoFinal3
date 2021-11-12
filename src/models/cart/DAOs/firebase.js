import { cartDB } from '../../../services/dbFireworks';

  export class CartFireBaseDAO{
    cart;
  
    constructor(local = false) {
     
    }
  
    async get(id) {
      let output = [];
      
        output = await cartDB.doc(id).get();
        
        return output;
    }
  
    async add(data) {
      if (!data.product.id) throw new Error('invalid data');
      const doc = cartDB.doc();
      return await doc.create(data)
    }
  
    async delete(id) {
        return await cartDB.doc(id).delete();
    }
  
  }