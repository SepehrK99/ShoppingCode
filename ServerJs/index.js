import express from "express";
import cors from "cors";
import qs from "qs";
import { CURSOR_FLAGS, Logger, MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import sha256 from 'crypto-js/sha256.js';
import hmacSHA512 from 'crypto-js/hmac-sha512.js';
import Base64 from 'crypto-js/enc-base64.js';
import jwt from 'jsonwebtoken';
import * as EmailValidator from 'email-validator';
import PasswordValidator from 'password-validator';

dotenv.config();

const url = process.env.MONGODB_CONNECTION_STRING;
const client = new MongoClient(url);

function log(req, res, next) {
  console.log("REQUESTED", req.url);
  console.log("Query", req.query);
  console.log("Body", req.body);
  next();
}

async function main() {
  await client.connect();

  const db = client.db("shopping");

  const app = express();

  app.set("query parser", (str) => qs.parse(str));

  app.use(express.json());
  app.use(cors());

  app.use(log);

  app.get("/api/product", async function (req, res) {
    try {
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
      const products = await db.collection("product").find(
        // {
        //   sizes: { $in: ['m', 'l'] },
        //   'colors.name': 'black',
        //   categories: 'dressed',
        //   $and: [
        //     { price: { $gte: 0 }},
        //     { price: { $lte: 40 }},
        //   ],
        // }
      ).toArray();
      res.send(products);
    } catch (error) {
      res.status(400).send(error.massage);
    }
  });

  // Massage von Contact 'insertone
  app.post("/api/message", async function (req, res) {
    try {
      const { name, email, message } = req.body;
      if (name.trim().length === 0) {
        res.status(400).send("Name is required");
        return;
      }
      if (email.trim().length === 0) {
        res.status(400).send("Email is required");
        return;
      }
      if (message.trim().length === 0) {
        res.status(400).send("Message is required");
        return;
      }
      const insertResult = await db
        .collection("message")
        .insertOne({ name, email, message });
      res.status(201).send(insertResult);
    } catch (error) {
      res.status(400).send(error.massage);
    }
  });

  /* GET users listing. */
  app.post("/api/login", async function (req, res) {
    try {
      const schema = new PasswordValidator();

      schema
      .is().min(6)                                    // Minimum length 6
      .is().max(100)                                  // Maximum length 100
      .has().uppercase()                              // Must have uppercase letters
      .has().lowercase()                              // Must have lowercase letters
      .has().digits(1)                                // Must have at least 2 digits
      .has().not().spaces()                           // Should not have spaces
      .has().oneOf(['!', '"','§','@'])                          

      if(EmailValidator.validate(email) && schema.validate(password)){
        const hashDigest = sha256(password);
        const hashed_password = Base64.stringify(hmacSHA512(hashDigest, process.env.JWT_SECRET));
        const userObject = await db
          .collection("login")
          .findOne({ email: email.toLowerCase(), hashed_password });

        if (userObject) {
          const token = jwt.sign({ _id: userObject._id, email: userObject.email }, process.env.JWT_SECRET);
          res.status(201).send({ token: token });
        } else {
          res.status(400).send();
        }
      }else{
        res.status(400).send();
      }
    } catch (error) {
      console.log('error', error);
      res.status(500).send({ error: error });
    }
  });

  app.post("/api/register", async function (req, res) {
    try {
      const email = req.body.email;
      const password = req.body.newPassword;

      console.log('PASS VAL', PasswordValidator);
      console.log(email);
      console.log(password);
      const schema = new PasswordValidator();

      schema
      .is().min(6)                                    // Minimum length 6
      .is().max(100)                                  // Maximum length 100
      .has().uppercase()                              // Must have uppercase letters
      .has().lowercase()                              // Must have lowercase letters
      .has().digits(2)                                // Must have at least 2 digits
      .has().not().spaces()                            // Should not have spaces
      .has().oneOf(['!', '?','§','@'])                

      if(EmailValidator.validate(email) && schema.validate(password)){
        const hashDigest = sha256(password);
        const hashed_password = Base64.stringify(hmacSHA512(hashDigest, process.env.JWT_SECRET));
        const insertResult = await db
        .collection("login")
        .insertOne({ email: email.toLowerCase(), hashed_password });

        const token = jwt.sign({ _id: insertResult.insertedId , email: email.toLowerCase() }, process.env.JWT_SECRET);
        res.status(201).send({ token: token});
      }else{
        res.status(400).send();
      }
    } catch (error) {
      console.log('error', error);
      res.status(500).send({ error: error });
    }
  });

  app.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send({ message: "Unauthorized" })
    } else {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function (err, decoded) {
            if(decoded){
                console.log('DECODED TOKEN', decoded);
                req.user = decoded.data;
                next()
            }else{
                res.status(401).send({ message: "Unauthorized" })
            }
        })
    }
  }

  app.get('/profile', app.verifyToken, async (req, res) => {
   

    res.send( { status: 1, data: {userName: 'rasyue', userWebsite: 'https://rasyue.com'} ,message: 'Successful'} )
  });
  
  app.listen(3000, () => {
    console.log("server running");
  });
}

main().catch((error) => {
  console.error(error);
});
