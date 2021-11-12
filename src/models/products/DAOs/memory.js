  export class ProductosMemDAO {
    productos= [];
  
    constructor() {
      const mockData = [
        { _id: '1', timestamp: Date.now(), nombre: 'lapiz', descripcion: 'Hojas de papel', codigo: 'PAP4', foto: 'www.foto.com', precio: 200, stock: 15 },
        { _id: '2', timestamp: Date.now(), nombre: 'cartuchera', descripcion: 'Cartucheras', codigo: 'cart', foto: 'www.foto.com', precio: 200, stock: 15  },
        { _id: '3', timestamp: Date.now(), nombre: 'boligoma', descripcion: 'boligomas', codigo: 'bol', foto: 'www.foto.com', precio: 200, stock: 15  },
      ];
  
      mockData.forEach((aMock) => this.productos.push(aMock));
    }
  
    findIndex(id) {
      return this.productos.findIndex((aProduct) => aProduct._id == id);
    }
  
    find(id){
      return this.productos.find((aProduct) => aProduct._id === id);
    }
  
    async get(id){
      if (id) {
        return this.productos.filter((aProduct) => aProduct._id === id);
      }
      return this.productos;
    }
  
    async add(data){
      if (!data.nombre || !data.precio) throw new Error('invalid data');
  
      const newItem = {
        _id: (this.productos.length + 1).toString(),
        timestamp: Date.now(),
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock
      };

      
  
      this.productos.push(newItem);
      console.log(productos);
      return newItem;
    }
  
    async update(id, newProductData) {
      const index = this.findIndex(id);
      const oldProduct = this.productos[index];
  
      const updatedProduct = { ...oldProduct, ...newProductData };
      this.productos.splice(index, 1, updatedProduct);
      return updatedProduct;
    }
  
    async delete(id){
      const index = this.findIndex(id);
      this.productos.splice(index, 1);
    }
  
    async query(options){
      const Conditions = (aProduct) => boolean;
      const query = [];
  
      if (options.nombre)
        query.push((aProduct) => aProduct.nombre == options.nombre);
  
      if (options.precio)
        query.push((aProduct) => aProduct.precio == options.precio);
  
      return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
    }
  }