import admin from 'firebase-admin';
import serviceAccount from '../../firebase.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore();


export const productDB = db.collection('products');
export const cartDB = db.collection('cart');