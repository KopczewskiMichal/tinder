const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.text({ type: 'text/*' })); // Bez tej linii nie działa
const PORT = 8080;


app.get(("/test"), (req, res) => {
  res.send("Server nasłuchuje...")
})












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