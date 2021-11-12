import mongoose from 'mongoose';
import Config from '../config';

export const connectDb = () => {
  return mongoose.connect(`mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`, { useNewUrlParser: true });
};