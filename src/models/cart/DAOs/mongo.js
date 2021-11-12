import mongoose from 'mongoose';
import Config from '../../../config';

const cartSchema = new mongoose.Schema({
  timestamp: Date,
  product: {
  _id: String,
  timestamp: Date,
  nombre: String,
  descripcion: String,
  codigo: String,
  foto: String,
  precio: Number,
  stock: Number},
});

export class CartAtlasDAO{
  srv;
  cart;

  constructor(local = true) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else
      this.srv = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
  
      mongoose.connect(this.srv);
    this.cart = mongoose.model('cart', cartSchema);
  }

  async get(id) {
    let output = [];
    try {
      if (id) {
        const document = await this.cart.findById(id);
        if (document) output.push(document);
      } else {
        output = await this.cart.find();
      }

      return output;
    } catch (err) {
      return output;
    }
  }

  async add(data) {
    if (!data.product.id) throw new Error('invalid data');

    const newCart = new this.cart(data);
    await newCart.save();

    return newCart;
  }

  async delete(id) {
    await this.cart.findByIdAndDelete(id);
  }
}