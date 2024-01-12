const DBActions = require('./DBActions');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.text({ type: 'text/*' }));
const PORT = 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get(("/test"), (req, res) => {
  res.send("Server nasłuchuje...")
})

app.get(("/profiles/:id"), async (req, res) => {
  try {
    const userID = req.params.id
    const database = new DBActions();
    const profileInfo = await database.getProfileInfo(userID);
    if (profileInfo != null) {
      res.send(profileInfo)
    } else {
      res.status(500).send("Account with this ID doesn't exist.")
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }

})

app.post(("/Register"), async (req, res)=> {
  try {
    const database = new DBActions();
    const existInDb = await database.isAccountInDB(req.body.email);
    if (database.validateForm(req.body) && !existInDb) {
      await database.createAccount(req.body);
      res.send("Utworzono konto")
    } else {
      res.status(500).send("Account with this email exist.")
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post(("/Login"), async (req, res)=> {
  try {
    const database = new DBActions();
    const userID = await database.login(req.body)
    if (userID != null) {
      res.send(userID)
    } else {
      res.status(500).send("Invalid data.")
    }
  } catch (error) {
    res.status(500).send("Login failed.")
  }
});




app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});