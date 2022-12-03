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
          $or: [
            { name: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') },
          ],
        }

        if (req.query.search) {
          query["$or"] = ...
        }
      */
      const query = {};
      if (req.query.categories) {
        query.categories = { $in: req.query.categories.split(',') };
      }
      if (req.query.sizes) {
        query.sizes = { $in: req.query.sizes.split(',') };
      }
      if (req.query.colors) {
        query['colors.name'] = { $in: req.query.colors.split(',') };
      }
      const products = await db.collection("product").find(query).toArray();
      res.send(products);
    } catch (error) {
      console.error(error.message);
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
      const email = req.body.email;
      const password = req.body.password;

      const schema = new PasswordValidator();

      schema
      .is().min(6)                                    // Minimum length 6
      .is().max(100)                                  // Maximum length 100
      .has().uppercase()                              // Must have uppercase letters
      .has().lowercase()                              // Must have lowercase letters
      .has().digits(2)                                // Must have at least 2 digits
      .has().not().spaces()                           // Should not have spaces
      // .has().oneOf(['!', '"','§','@'])                          

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
          res.status(404).send();
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

      const schema = new PasswordValidator();

      const isEmailTaken = (await db.collection('login').count({ email })) > 0;
      schema
      .is().min(6)                                    // Minimum length 6
      .is().max(100)                                  // Maximum length 100
      .has().uppercase()                              // Must have uppercase letters
      .has().lowercase()                              // Must have lowercase letters
      .has().digits(2)                                // Must have at least 2 digits
      .has().not().spaces()                            // Should not have spaces
      // .has().oneOf(['!', '?','§','@'])                

      if(!isEmailTaken && EmailValidator.validate(email) && schema.validate(password)){
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
                console.log('DECODED TOKEN', decoded); req.user = decoded;
                next()
            }else{
                res.status(401).send({ message: "Unauthorized" })
            }
        })
    }
  }

  app.post('/api/profile', app.verifyToken, async function (req, res) {
    try {
      const { fullname, address, city, state, zip } = req.body;
      if (fullname.trim().length === 0) {
        res.status(400).send("Name is required");
        return;
      }
      if (address.trim().length === 0) {
        res.status(400).send("Message is required");
        return;
      }
      if (city.trim().length === 0) {
        res.status(400).send("Message is required");
        return;
      }
      if (state.trim().length === 0) {
        res.status(400).send("Message is required");
        return;
      }
      if (zip.trim().length === 0) {
        res.status(400).send("Message is required");
        return;
      }
      const updateResult = await db
        .collection("login")
        .updateOne({ email: req.user.email }, { $set: { fullname, address, city, state, zip } });
      res.status(201).send(updateResult);
    } catch (error) {
      res.status(400).send(error.massage);
    }
  });

  app.get('/api/profile', app.verifyToken, async function(req, res){
    try {
      const findResult = await db
        .collection("login")
        .findOne({ email: req.user.email });
      if (!findResult) {
        res.status(404).send();
        return;
      }
      delete findResult.hashed_password;
      res.status(200).send(findResult);
    } catch (error) {
      res.status(400).send(error.massage);
    }
  });
  
  app.listen(3000, () => {
    console.log("server running");
  });
}

main().catch((error) => {
  console.error(error);
});
