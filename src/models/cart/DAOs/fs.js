import fs from 'fs';

export class CartFSDAO  {
  cart = [];
  nombreArchivo;

  constructor(fileName) {
    /*const mockData = [
        { _id: '1', timestamp: Date.now(), nombre: 'lapiz', descripcion: 'Hojas de papel', codigo: 'PAP4', foto: 'www.foto.com', precio: 200, stock: 15 },
        { _id: '2', timestamp: Date.now(), nombre: 'cartuchera', descripcion: 'Cartucheras', codigo: 'cart', foto: 'www.foto.com', precio: 200, stock: 15  },
        { _id: '3', timestamp: Date.now(), nombre: 'boligoma', descripcion: 'boligomas', codigo: 'bol', foto: 'www.foto.com', precio: 200, stock: 15  },
    ];*/
    this.nombreArchivo = fileName;
    /*this.cart = mockData;
    this.guardar();*/
  }

  async leer(archivo) {
    console.log('archivo:', archivo);
    this.cart = JSON.parse(await fs.promises.readFile(archivo, 'utf-8'));
  }

  async guardar() {
    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(this.cart, null, '\t')
    );
  }

  async findIndex(id) {
    await this.leer(this.nombreArchivo);
    return this.cart.findIndex((aCart) => aCart._id == id);
  }

  async find(id) {
    await this.leer(this.nombreArchivo);

    return this.cart.find((aCart) => aCart._id === id);
  }

  async get(id) {
    await this.leer(this.nombreArchivo);

    if (id) {
      return this.cart.filter((aCart) => aCart._id === id);
    }
    return this.cart;
  }

  async add(data) {
    if (!data.product.id) throw new Error('invalid data');

    await this.leer(this.nombreArchivo);

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

    await this.guardar();

    return newItem;
  }

  async delete(id) {
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    this.cart.splice(index, 1);
    await this.guardar();
  }
}