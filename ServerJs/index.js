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





/* GET users listing. */
app.get('/api/login', async function (req, res) {
  try {
    const {email, password } = req.body; 
   
    const hashed_password = md5(password.toString());
    const checkEmail = await db.collection('login').insertOne({email, message });
      res.status(201).send(insertResult);
    con.query(checkEmail, [email], (err, result, fields) => {
      if(!result.length){
        con.query(
          mongodb, [email, hashed_password],
        (err, result, fields) =>{
          if(err){
            res.send({ status: 0, data: err });
          }else{
            let token = jwt.sign({ data: result }, 'secret')
            res.send({ status: 1, data: result, token : token });
          }
         
        })
      }
    });
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});
app.post('/api/login', async function (req, res) {
  try {
    const {email, password } = req.body; 
   
    const hashed_password = md5(password.toString())
    const loginEmail = await db.collection('login').insertOne({email, message });
      res.status(201).send(insertResult);
    con.query(
      loginEmail, [email, hashed_password],
    function(err, result, fields){
      if(err){
        res.send({ status: 0, data: err });
      }else{
        let token = jwt.sign({ data: result }, 'secret')
        res.send({ status: 1, data: result, token: token });
      }
     
    })
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

  app.listen(3000, () =>{
    console.log('server running');
  });
}

main().catch((error) => {
  console.error(error);
});