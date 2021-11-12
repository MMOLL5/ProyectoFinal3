import { productDB } from '../../../services/dbFireworks';

  export class ProductosFireBaseDAO{
    productos;
  
    constructor(local = false) {
     
    }
  
    async get(id) {
      let output = [];
      
        output = await productDB.doc(id).get();
        
        return output;
    }
  
    async add(data) {
      if (!data.nombre || !data.precio) throw new Error('invalid data');
      const doc = productDB.doc();
      return await doc.create(data)
    }
  
    async update(id, data) {
      return await productDB.doc(id).update(data);
    }
  
    async delete(id) {
        return await productDB.doc(id).delete();
    }
  
    /*async query(options) {
      let query = {};
  
      if (options.nombre) query.nombre = options.nombre;
  
      if (options.precio) query.precio = options.precio;

      return await sqliteDB.from('products').where(query);
    }*/
  }