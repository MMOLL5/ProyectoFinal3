export class CartMemDAO {
    cart= [];
  
    constructor() {
      const mockData = [
        { _id: '1', timestamp: Date.now(), product:{ _id: '1', timestamp: Date.now(), nombre: 'lapiz', descripcion: 'Hojas de papel', codigo: 'PAP4', foto: 'www.foto.com', precio: 200, stock: 15 }},
        { _id: '2', timestamp: Date.now(), product:{ _id: '2', timestamp: Date.now(), nombre: 'cartuchera', descripcion: 'Cartucheras', codigo: 'cart', foto: 'www.foto.com', precio: 200, stock: 15  }},
        { _id: '2', timestamp: Date.now(), product:{ _id: '3', timestamp: Date.now(), nombre: 'boligoma', descripcion: 'boligomas', codigo: 'bol', foto: 'www.foto.com', precio: 200, stock: 15  }},
      ];
  
      mockData.forEach((aMock) => this.cart.push(aMock));
    }
  
    findIndex(id) {
      return this.cart.findIndex((aCart) => aCart._id == id);
    }
  
    find(id){
      return this.cart.find((aCart) => aCart._id === id);
    }
  
    async get(id){
      if (id) {
        return this.cart.filter((acart) => acart._id === id);
      }
      return this.cart;
    }
  
    async add(data){
      if (!data.product.id) throw new Error('invalid data');
  
      const newItem = {
        _id: (this.cart.length + 1).toString(),
        timestamp: Date.now(),
        productos:
        {_id: data.product.id,
        timestamp: data.product.timestamp,
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock}
      };
  
      this.cart.push(newItem);
      console.log(cart);
      return newItem;
    }
  
    async delete(id){
      const index = this.findIndex(id);
      this.cart.splice(index, 1);
    }
  
  }