//import { newCartI, CartI } from '../models/cart/cart.interface';
import { NoticiasFactoryDAO } from '../models/cart/cart.factory';
import { TipoPersistencia } from '../models/cart/cart.factory';
//import { CartQuery } from '../models/cart/cart.interface';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.LocalMongo;

class cartAPI {
  cart;

  constructor() {
    this.cart = NoticiasFactoryDAO.get(tipo);
  }

  async getCart(id) {
    if (id) return this.cart.get(id);

    return this.cart.get();
  }

  async addCart(cartData) {
    const newCart = await this.cart.add(cartData);
    return newCart;
  }

  async updateCart(id, cartData) {
    const updatedCart = await this.cart.update(id, cartData);
    return updatedCart;
  }

  async deleteCart(id) {
    await this.cart.delete(id);
  }

  async query(options) {
    return await this.cart.query(options);
  }
}

export const cartsAPI = new cartAPI();