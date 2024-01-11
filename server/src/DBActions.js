// import { createRequire } from 'module';

// const require = createRequire(import.meta.url);

const { MongoClient, ObjectId } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

class DBActions {
  constructor() {
    const ipAdress = "127.0.0.1";
    const port = "27017";
    const databaseName = "tinder";
    const connectionString = `mongodb://${ipAdress}:${port}/${databaseName}`;
    this.client = new MongoClient(connectionString);
    this.conn = null;
  }

  async createAccount(sourceData) {
    try {
      this.conn = await this.client.connect();
      const collection = this.conn.db("tinder").collection("profiles");
      const profileData = sourceData;
      const passwordHash = crypto.createHash('sha256', sourceData.password); // Nie przechowujemy jawnego hasła!!!
      delete profileData.password;
      profileData.passwordHash = passwordHash;
      profileData.userID = uuidv4();
      await collection.insertOne(profileData);
    } catch (error) {
      console.error("Błąd podczas tworzenia konta: ", error);
      throw error;
    } finally {
      this.conn && this.conn.close();
    }
  }
}


module.exports = DBActions;