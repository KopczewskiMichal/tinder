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
const { result } = require("lodash");

const profileValidationSchema = Yup.object().shape({
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

app.post("/registerProfileFromFile", (req, res) => {
  profileValidationSchema
    .validate(req.body)
    .then(() => {
      Yup.string()
        .min(5, "Must be at least 5 characters")
        .max(
          100,
          "Seriously, do You want to remember more than 100 characters?"
        )
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol")
        .required("Required")
        .validate(req.body.password)
        .catch((error) => res.status(500).send(error))
        .then(() => {
          const database = new DBActions();
          database.isAccountInDB(req.body.email).then((result) => {
            if (result === false) {
              const database2 = new DBActions();
              database2
                .createAccount(req.body)
                .then((result) => res.send(result));
            } else {
              res.status(500).send("Email exists in db");
            }
          });
        });
    })
    .catch((err) => res.status(500).send("Invalid profile data"));
});

app.put("/updateProfile", async (req, res) => {
  try {
    await profileValidationSchema.validate(req.body); // Nie trzeba if, to po prostu rzuca błędem więc zapytanie nie przechodzi
    const database = new DBActions();

    let dataToUpdate = req.body;
    let keysToRemove = {};
    
    const emptyUserData = {
      dateOfBirth: new Date("01/01/1970"),
      height: 100,
      degree: "",
      city: "",
      lookingFor: "",
      aboutMe: "",
      image: "",
    };

    Object.keys(req.body).forEach((key) => {
      if (
        emptyUserData.hasOwnProperty(key) &&
        emptyUserData[key] === req.body[key]
      ) {
        delete dataToUpdate[key];
        keysToRemove[key] = null;
      }
    });

    await database.updateProfile(dataToUpdate, keysToRemove);
    res.send("Succes");
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
});

app.delete("/delete/:id", (req, res) => {
  const userID = req.params.id;
  console.log(req.params);
  const database1 = new DBActions();
  const database2 = new DBActions();
  
  const deleteFromProfiles = database1.deleteUserFromProfiles(userID);
  const deleteFromRelations = database2.deleteUserFromRelations(userID);
  
  Promise.all([deleteFromProfiles, deleteFromRelations])
  .then((response) => res.send(response))
  .catch((err) => {
    console.error(err);
      res.status(500).send(err);
    });
  });
  
  // * nie CRUD
  app.post("/opinions", (req, res) => {
    const database1 = new DBActions();
    const database2 = new DBActions();
    const queries = [];
    const { candidateID, isAccepted, senderID } = req.body;
  
    queries.push(
      database1
        .setCandidateOpinion(candidateID, isAccepted)
        .catch((error) => console.error(error))
    );
    if (isAccepted == true) {
      queries.push(
        database2
          .handlePositiveOpinion(candidateID, senderID)
          .catch((error) => console.error(error))
      );
    }
  
    Promise.all(queries)
      .then(() => {
        res.send("Succes");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Problems");
      });
  });

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

app.get("/matchesToConfirm/:id", (req, res) => {
  const userID = req.params.id;
  const database = new DBActions();
  database
    .getMatchesToConfirm(userID)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});

// * nie CRUD
app.put("/confirmMatch", (req, res) => {
  const relationID = req.body.id;
  const opinion = req.body.opinion;
  const database = new DBActions();
  if (opinion === true) {
    database
      .confirmMatch(relationID)
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send(error));
  } else {
    database
      .rejectMatch(relationID)
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send(error));
  }
});

app.post("/handleSendMessage", (req, res) => {
  const relationID = req.body.relationID;
  const message = req.body.message;
  const database = new DBActions();
  database
    .handleSendMessage(relationID, message)
    .then((result) => res.send(result))
    .catch((error) => res.status(500).send(error));
});

app.get("/getRelationMessages/:id", (req, res) => {
  const id = req.params.id;
  const database = new DBActions();
  database
    .getRelationMessages(id)
    .then((result) => res.send(result))
    .catch((error) => res.status(500).send(error));
});

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


app.get("/conversationSamples/:id", (req, res) => {
  const database = new DBActions();
  const userID = req.params.id;
  database
    .getRelationSamples(userID)
    .then((result) => res.send(result))
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
