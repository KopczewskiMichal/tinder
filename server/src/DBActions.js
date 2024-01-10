import { MongoClient } from "mongodb";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const ObjectId = require("mongodb").ObjectId;

export default class DBActions {
  constructor() {
    const ipAdress = "127.0.0.1";
    const port = "27017";
    const databaseName = "tinder";
    const connectionString = `mongodb://${ipAdress}:${port}/${databaseName}`;
    this.client = new MongoClient(connectionString);
    this.conn = null;
  }

}