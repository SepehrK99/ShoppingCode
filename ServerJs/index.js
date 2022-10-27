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
import {MongoClient} from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_CONNECTION_STRING;
const client = new MongoClient(url);

async function main() {
  await client.connect();
  const db = client.db('shopping');
  
  const app = express()

  app.get('/product', async function (req, res) {
    try{
      const products =await db.collection('product').find({}).toArray();
      res.send(products);
    }
    catch (error){
      res.status(400).send(error.massage);
    }
  })

  app.listen(3000, () =>{
    console.log('server running');
  });
}

main().catch((error) => {
  console.error(error);
});

