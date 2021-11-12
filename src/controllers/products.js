import { Request, Response, NextFunction } from 'express';
import { productsAPI } from '../apis/products';
//import { productsPersistencia } from '../persistencia/products';

class Producto {
  checkAddProducts(req, res, next) {
    const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body;

    if (!nombre || !descripcion || !codigo|| !foto || !precio|| !stock|| 
      typeof nombre !== 'string' ||
      typeof descripcion !== 'string' || 
      typeof codigo !== 'string' || 
      typeof foto !== 'string' || 
      isNaN(precio) ||
      isNaN(stock)) {
      return res.status(400).json({
        msg: 'Campos del body invalidos',
      });
    }

    next();
  }

  async checkProductExists(req, res, next) {
    const id = Number(req.params.id);
    const producto = await productsAPI.getProducts(id);
    console.log('checkProductExists');
    if (!producto) {
      return res.status(404).json({
        msg: 'Producto no encontrado',
      });
    }
    next();
  }

  async getProducts(req, res) {
    const { id } = req.params;
    const { nombre, precio } = req.query;
    if (id) {
      const result = await productsAPI.getProducts(id);
      if (!result.length)
        return res.status(404).json({
          data: 'objeto no encontrado',
        });

      return res.json({
        data: result,
      });
    }

    const query = {};

    if (nombre) query.nombre = nombre.toString();

    if (precio) query.precio = Number(precio);

    if (Object.keys(query).length) {
      return res.json({
        data: await productsAPI.query(query),
      });
    }

    res.json({
      data: await productsAPI.getProducts(),
    });
  }

  async addProducts(req, res) {
    const newItem = await productsAPI.addProduct(req.body);

    res.json({
      msg: 'producto agregado con exito',
      data: newItem,
    });
  }

  async updateProducts(req, res) {
    const id = req.params.id;

    const updatedItem = await productsAPI.updateProduct(id, req.body);

    res.json({
      msg: 'actualizando producto',
      data: updatedItem,
    });
  }

  async deleteProducts(req, res) {
    const id = req.params.id;
    await productsAPI.deleteProduct(id);
    res.json({
      msg: 'producto borrado',
    });
  }
  }

export const productsController = new Producto();