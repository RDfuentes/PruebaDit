const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Ruta principal
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido." }); 
});

require("./app/routes/pregunta.routes.js")(app);

//puerto y mensaje de conexion
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Conectado al puerto  ${PORT}.`);
});
