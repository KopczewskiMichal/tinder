const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");


class DBActions {
  constructor() {
    const ipAdress = "127.0.0.1";
    const port = "27017";
    const databaseName = "tinder";
    const connectionString = `mongodb://${ipAdress}:${port}/${databaseName}`;
    this.client = new MongoClient(connectionString);
    this.conn = null;
  }

  async getProfileInfo(userID) {
    try {
      this.conn = await this.client.connect();
      const collection = this.conn.db("tinder").collection("profiles");
      const profileInfo = await collection.findOne(
        { userID: userID },
        {
          projection: {
            _id: 0,
            passwordHash: 0,
            userID: 0,
            receivedNegative: 0,
            receivedPositive: 0,
          },
        }
      );
      return profileInfo;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      this.conn && this.conn.close();
    }
  }

  async updateProfile(data) {
    try {
      //TODO wywalić pierwsze 2 linie do konstruktora
      this.conn = await this.client.connect();
      const collection = this.conn.db("tinder").collection("profiles");
      await collection.updateOne(
        { userID: data.userID },
        {
          $set: data,
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      this.conn && this.conn.close();
    }
  }

  async createAccount(sourceData) {
    try {
      this.conn = await this.client.connect();
      const collection = this.conn.db("tinder").collection("profiles");
      const profileData = sourceData;
      const passwordHash = crypto
        .createHash("sha256", sourceData.password)
        .digest("hex"); // Nie przechowujemy jawnego hasła!!!
      delete profileData.password;
      profileData.passwordHash = passwordHash;
      profileData.userID = uuidv4();
      profileData.receivedPositive = 0;
      profileData.receivedNegative = 0;
      await collection.insertOne(profileData);
      return profileData.userID;
    } catch (error) {
      console.error("Błąd podczas tworzenia konta: ", error);
      throw error;
    } finally {
      this.conn && this.conn.close();
    }
  }

  // boolean
  async isAccountInDB(email) {
    try {
      this.conn = await this.client.connect();
      const collection = this.conn.db("tinder").collection("profiles");
      const queryRes = await collection.findOne({ email: email });
      if (queryRes != null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    } finally {
      this.conn && this.conn.close();
    }
  }

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
      new Date(data.dateOfBirth) <=
        new Date(
          new Date().getFullYear() - 18,
          new Date().getMonth(),
          new Date().getDate()
        ) &&
      !!data.password &&
      data.password.length >= 5 &&
      data.password.length <= 100 &&
      /[0-9]/.test(data.password) &&
      /[a-z]/.test(data.password) &&
      /[A-Z]/.test(data.password) &&
      /[^\w]/.test(data.password) &&
      ["male", "female"].includes(data.sex)
    );
  }

  //String
  async login(sourceData) {
    try {
      this.conn = await this.client.connect();
      const collection = this.conn.db("tinder").collection("profiles");
      const queryRes = await collection.findOne({ email: sourceData.email });
      const givenPasswordHash = crypto
        .createHash("sha256", sourceData.password)
        .digest("hex");
      if (queryRes != null && givenPasswordHash == queryRes.passwordHash) {
        return queryRes.userID;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    } finally {
      this.conn && this.conn.close();
    }
  }

  //object
  getUserInfo(userID) {
    return new Promise((resolve, reject) => {
      this.client
        .connect()
        .then((conn) => {
          this.conn = conn;
          const collection = this.conn.db("tinder").collection("profiles");
          return collection
            .aggregate([
              {
                $match: { userID: userID },
              },
              { $limit: 1 },
              {
                $addFields: {
                  age: {
                    $subtract: [
                      { $year: new Date() },
                      { $year: new Date("$dateOfBirth") },
                    ],
                  },
                },
              },
              { $project: { _id: 0, age: 1, sex: 1 } },
            ])
            .toArray();
        })
        .then((preferences) => {
          resolve(preferences);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          if (this.conn) {
            this.conn.close();
          }
        });
    });
  }

  getRelatedWith(userID) {
    return new Promise((resolve, reject) => {
      this.client.connect().then((conn) => {
        this.conn = conn;
        const collection = this.conn.db("tinder").collection("relations");
         return collection.aggregate([
          {
            $match: {
              users: { $elemMatch: {$eq: userID}  },
            },
          },
          {
            $project: {
              _id: 0,
              users: {
                $setDifference: ["$users", [userID]]
              }
            },
          },
        ]).toArray()
      })
      .then((resArr) => {
        const res = resArr.map((elem) => elem.users[0])
        resolve(res)})
      .catch((error) => reject(error))
      .finally(() => {
        if (this.conn) {
          this.conn.close();
        };
      });
    });
  };

  getCandidates(userInfo, relatedUsers) {
    return new Promise((resolve, reject) => {
      this.client.connect()
      .then((conn) => {
        userInfo = userInfo[0]
        this.conn = conn;
        const collection = this.conn.db("tinder").collection("profiles");
        return collection
          .aggregate([
            {
              $match: {
                sex: {
                  $ne: userInfo.sex,
                },
                userID: {
                  $not: {
                    $in: relatedUsers
                  }
                }
              },
            },
            {
              $addFields: {
                age: {
                  $subtract: [
                    { $year: new Date() },
                    { $year: new Date("$dateOfBirth") },
                  ],
                },
                ageDiff: {
                  $abs: {
                    $subtract: [
                      new Date(userInfo.dateOfBirth),
                      new Date("$dateOfBirth"),
                    ],
                  },
                },
                stats: {
                  $cond: {
                    if: { $eq: ["$receivedNegative", 0] },
                    then: "$receivedPositive",
                    else: {
                      $divide: ["$receivedPositive", "$receivedNegative"],
                    },
                  },
                },
              },
            },
            {
              $sort: {
                ageDiff: 1,
                stats: -1,
              },
            },
            { $limit: 50 },

            {
              $project: {
                _id: 0,
                passwordHash: 0,
                email: 0,
                dateOfBirth: 0,
                receivedNegative: 0,
                receivedPositive: 0,
                stats: 0,
                ageDiff: 0
              },
            },
          ])
          .toArray()
      .then((candidates) => {
        resolve(candidates);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        if (this.conn) {
          this.conn.close();
        }
      });
  })
})}
}

module.exports = DBActions;
