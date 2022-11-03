// const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client(CLIENT_ID);
// async function verify() {
//   const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const userid = payload['sub'];
//   // If request specified a G Suite domain:
//   // const domain = payload['hd'];
// }
// verify().catch(console.error);

import express from 'express';
import cors from 'cors';
import qs from 'qs';
import {MongoClient} from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_CONNECTION_STRING;
const client = new MongoClient(url);

function log(req, res, next) {
  console.log('REQUESTED', req.url);
  console.log('Query', req.query);
  console.log('Body', req.body);
  next();
}

async function main() {
  await client.connect();
  const db = client.db('shopping');
  
  const app = express();
  app.set('query parser', (str) => qs.parse(str));

  app.use(express.json());
  app.use(cors());

  app.use(log);

  app.get('/api/product', async function (req, res) {
    try{
      // Filter examples:
      // size available in m: { sizes: 'm' }
      // size available in m and l: { sizes: { $in: ['m', 'l'] } }
      // price range 10 to 40: { $and: [{ price: { $gte: 10 }}, { price: { $lte: 40 }}] }
      // color name equals blue: { 'colors.name': 'blue' }
      /*
        combine multiple filters: 
        {
          sizes: { $in: ['m', 'l'] },
          'colors.name': 'green',
          $and: [
            { price: { $gte: 10 }},
            { price: { $lte: 40 }},
          ],
        }
      */
      const products = await db.collection('product').find({}).toArray();
      res.send(products);
    }
    catch (error){
      res.status(400).send(error.massage);
    }
  })

  // Massage von Contact 'insertone
  app.post('/api/message', async function(req, res){
    try{
      const { name, email, message } = req.body;
      if (name.trim().length === 0) {
        res.status(400).send('Name is required');
        return;
      }
      if (email.trim().length === 0) {
        res.status(400).send('Email is required');
        return;
      }
      if (message.trim().length === 0) {
        res.status(400).send('Message is required');
        return;
      }
      const insertResult = await db.collection('message').insertOne({ name, email, message });
      res.status(201).send(insertResult);
    }
    catch (error){
      res.status(400).send(error.massage);
    }
  });

  app.listen(3000, () =>{
    console.log('server running');
  });
}

main().catch((error) => {
  console.error(error);
});

