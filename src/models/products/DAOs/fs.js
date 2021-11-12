import fs from 'fs';
/*import {
  newProductI,
  ProductI,
  ProductBaseClass,
  ProductQuery,
} from '../products.interface';*/

export class ProductosFSDAO  {
  productos = [];
  nombreArchivo;

  constructor(fileName) {
    /*const mockData = [
        { _id: '1', timestamp: Date.now(), nombre: 'lapiz', descripcion: 'Hojas de papel', codigo: 'PAP4', foto: 'www.foto.com', precio: 200, stock: 15 },
        { _id: '2', timestamp: Date.now(), nombre: 'cartuchera', descripcion: 'Cartucheras', codigo: 'cart', foto: 'www.foto.com', precio: 200, stock: 15  },
        { _id: '3', timestamp: Date.now(), nombre: 'boligoma', descripcion: 'boligomas', codigo: 'bol', foto: 'www.foto.com', precio: 200, stock: 15  },
    ];*/
    this.nombreArchivo = fileName;
    /*this.productos = mockData;
    this.guardar();*/
  }

  async leer(archivo) {
    console.log('archivo:', archivo);
    this.productos = JSON.parse(await fs.promises.readFile(archivo, 'utf-8'));
  }

  async guardar() {
    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(this.productos, null, '\t')
    );
  }

  async findIndex(id) {
    await this.leer(this.nombreArchivo);
    return this.productos.findIndex((aProduct) => aProduct._id == id);
  }

  async find(id) {
    await this.leer(this.nombreArchivo);

    return this.productos.find((aProduct) => aProduct._id === id);
  }

  async get(id) {
    await this.leer(this.nombreArchivo);

    if (id) {
      return this.productos.filter((aProduct) => aProduct._id === id);
    }
    return this.productos;
  }

  async add(data) {
    if (!data.nombre || !data.precio) throw new Error('invalid data');

    await this.leer(this.nombreArchivo);

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

    await this.guardar();

    return newItem;
  }

  async update(id, newProductData) {
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    const oldProduct = this.productos[index];

    const updatedProduct = { ...oldProduct, ...newProductData };
    this.productos.splice(index, 1, updatedProduct);

    await this.guardar();

    return updatedProduct;
  }

  async delete(id) {
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    this.productos.splice(index, 1);
    await this.guardar();
  }

  async query(options) {
    await this.leer(this.nombreArchivo);
    let Conditions = (aProduct) => boolean;
    const query = [];

    if (options.nombre)
      query.push((aProduct) => aProduct.nombre == options.nombre);

    if (options.precio)
      query.push((aProduct) => aProduct.precio == options.precio);

    return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
  }
}