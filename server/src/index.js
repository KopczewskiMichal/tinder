const DBActions = require("./DBActions");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.text({ type: "text/*" }));
const PORT = 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Yup = require("yup");

const updateValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  image: Yup.string().max(300, "It is too long"),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .test("is-adult", "You must be at least 18 years old", function (value) {
      const today = new Date();
      const minimumAgeDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return value <= minimumAgeDate;
    })
    .required("Date of birth is required"),
  height: Yup.number()
    .min(100, "If Your height is too small, you are child")
    .max(250, "It is impossible to be higher than 250cm"),
  degree: Yup.string().max(100),
  city: Yup.string().max(50, "It is too long"),
  lookingFor: Yup.string().oneOf(
    ["Long Relationship", "Frends", "FWB", "I don't know"],
    "Invalid option"
  ),
  email: Yup.string()
    .email("Incorrect email")
    .min(1, "Must be at least 1 character")
    .max(60, "Must be max 60 characters")
    .required("Required"),
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
    await updateValidationSchema.validate(req.body);  // Nie trzeba if, to po prostu rzuca błędem więc zapytanie nie przechodzi
    const database = new DBActions();

    await database.updateProfile(req.body);
    res.send("Succes");
  } catch (error) {
    res.status(500).send(error);
    console.error(error)
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
        return database
          .getCandidates(userInfo, relatedUsers)
          .then((candidates) => {
            res.send(candidates);
          })
          .catch((error) => {
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
