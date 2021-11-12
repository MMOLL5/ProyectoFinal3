//import { Request, Response, NextFunction } from 'express';
import { cartsAPI } from '../apis/cart';
//import { cartPersistencia } from '../persistencia/cart';

class Cart {
  checkAddProductCart(req, res, next) {
    const { timestamp, productId } = req.body;

    if (!productId ||
      isNaN(productId)) {
      return res.status(400).json({
        msg: 'Campos del body invalidos',
      });
    }

    next();
  }

  async checkCartExists(req, res, next) {
    const id = Number(req.params.id);
    const Cart = await cartsAPI.getProducts(id);

    if (!Cart) {
      return res.status(404).json({
        msg: 'Producto no encontrado',
      });
    }
    next();
  }

  async getProducts(req, res) {
    const { id } = req.params;
    if (id) {
      const result = await cartsAPI.getCart(id);
      if (!result.length)
        return res.status(404).json({
          data: 'objeto no encontrado',
        });

      return res.json({
        data: result,
      });
    }

    res.json({
      data: await cartsAPI.getCart(),
    });
  }

  async addProductCart(req, res) {
    const newItem = await cartsAPI.addCart(req.body);

    res.json({
      msg: 'Producto agregado',
      data: newItem,
    });
  }

  async deleteProductCart(req, res) {
    const id = req.params.id;
    await cartsAPI.deleteCart(id);
    res.json({
      msg: 'producto borrado',
    });
  }
}

export const cartController = new Cart();