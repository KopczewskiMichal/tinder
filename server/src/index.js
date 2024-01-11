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
  console.log("Obsłużono zapytanie")
})

app.post(("/Register"), async (req, res)=> {
  // TODO Obsługa walidacji danych po stronie servera

  try {
    const database = new DBActions();
    
    await database.createAccount(req.body);
    res.send("Utworzono konto")
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    res.status(500).send(error.toString());
  }
});












// app.post("/games/:id", (req, res) => {
//   const id = req.params.id;
//   const moveData = req.body; // pozycja spacja symbol
//   const position = parseInt(moveData[0]);
//   const symbol = moveData[2]
//   if (games[id][position - 1] === " ") {
//     games[id][position - 1] = symbol
//     res.send(`${gameToBoardString(games[id])}\n`)
//   } else {
//     res.send(`Nie możesz w tym miejscu wykonać ruchu, nie jest ono puste\n${gameToBoardString(games[id])}\n`)
//   }
// })

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});