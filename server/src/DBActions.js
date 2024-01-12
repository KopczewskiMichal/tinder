// import { createRequire } from 'module';

// const require = createRequire(import.meta.url);

const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const { error } = require('console');

class DBActions {
  constructor() {
    const ipAdress = "127.0.0.1";
    const port = "27017";
    const databaseName = "tinder";
    const connectionString = `mongodb://${ipAdress}:${port}/${databaseName}`;
    this.client = new MongoClient(connectionString);
    this.conn = null;
  }

  async getProfileInfo (userID) {
    try {
      this.conn = await this.client.connect();
      const collection = this.conn.db("tinder").collection("profiles");
      const profileInfo = await collection.findOne(
        {userID: userID},
        {_id:0, passwordHash:0, userID:0})
      return profileInfo;
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      this.conn && this.conn.close();
    }
  }

  async createAccount(sourceData) {
      try {
        this.conn = await this.client.connect();
        const collection = this.conn.db("tinder").collection("profiles");
        const profileData = sourceData;
        const passwordHash = crypto.createHash('sha256', sourceData.password).digest('hex'); // Nie przechowujemy jawnego hasła!!!
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

  // boolean
  async isAccountInDB (email) {
    try {
      this.conn = await this.client.connect();
      const collection = this.conn.db("tinder").collection("profiles");
      const queryRes = await collection.findOne({email: email})
      if (queryRes != null)  {
        return true
      } else {
        return false
      }
    } catch (error) {
      throw error;
    } finally {
      this.conn && this.conn.close();
    }
  };

  // boolean
  validateForm(data) {
    return (
      !!data.email &&
      /^.+@.+\..+$/.test(data.email) &&
      data.email.length >= 1 &&
      data.email.length <= 60 &&
      !!data.name &&
      data.name.length >= 1 &&
      data.name.length <= 30 &&
      !!data.surname &&
      data.surname.length >= 1 &&
      data.surname.length <= 60 &&
      !!data.dateOfBirth &&
      new Date(data.dateOfBirth) <= new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()) &&
      !!data.password &&
      data.password.length >= 5 &&
      data.password.length <= 100 &&
      /[0-9]/.test(data.password) &&
      /[a-z]/.test(data.password) &&
      /[A-Z]/.test(data.password) &&
      /[^\w]/.test(data.password) &&
      ["male", "female"].includes(data.sex)
    );
  };

  //String
  async login (sourceData) {
    try {
      this.conn = await this.client.connect();
      const collection = this.conn.db("tinder").collection("profiles");
      const queryRes = await collection.findOne({email: sourceData.email})
      const givenPasswordHash = crypto.createHash('sha256', sourceData.password).digest('hex');
      if (queryRes != null && givenPasswordHash == queryRes.passwordHash)  {
        return queryRes.userID
      } else {
        return null
      }
    } catch (error) {
      throw error;
    } finally {
      this.conn && this.conn.close();
    }
  }
  
}


module.exports = DBActions;