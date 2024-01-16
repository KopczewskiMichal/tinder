const DBActions = require("./DBActions");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const e = require("express");
app.use(cors());
app.use(express.text({ type: "text/*" }));
const PORT = 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.send("Server nasłuchuje...");
});

app.get("/profiles/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const database = new DBActions();
    const profileInfo = await database.getProfileInfo(userID);
    if (profileInfo != null) {
      res.send(profileInfo);
    } else {
      res.status(500).send("Account with this ID doesn't exist.");
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post("/Register", async (req, res) => {
  try {
    const database = new DBActions();
    const existInDb = await database.isAccountInDB(req.body.email);
    if (database.validateForm(req.body) && !existInDb) {
      const userID = await database.createAccount(req.body);
      res.send(userID);
    } else {
      res.status(500).send("Account with this email exist.");
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.put("/updateProfile", async (req, res) => {
  try {
    const database = new DBActions();
    await database.updateProfile(req.body);
    res.send("Succes");
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Nie CRUD
app.post("/Login", async (req, res) => {
  try {
    const database = new DBActions();
    const userID = await database.login(req.body);
    if (userID != null) {
      res.send(userID);
    } else {
      res.status(500).send("Invalid data.");
    }
  } catch (error) {
    res.status(500).send("Login failed.");
  }
});

// * Inne niż CRUD i promise
app.get("/candidatesFor/:userID", (req, res) => {
  const userID = req.params.userID;
  let database = new DBActions();

  database
    .getRelatedWith(userID)
    .then((relatedUsers) => {
      let database = new DBActions();
      return database.getUserInfo(userID).then((userInfo) => {
        let database = new DBActions();
        return database.getCandidates(userInfo, relatedUsers)
          .then((candidates) => {
            res.send(candidates);
          })
          .catch((error) => {
            console.log("Napotkano na problemy z pobraniem kandydatów")
            res.status(500).send(error);
          });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ooops, we have some problems");
    });
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
