import * as homeService from "../services/homeServices"
import Users from "../models/Users"
import {MongoClient} from 'mongodb'

describe('testing users service',()=> {
    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect(process.env.MONGO_TEST_DB as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db();
    });
  
    afterAll(async () => {
      await connection.close();
    });

})