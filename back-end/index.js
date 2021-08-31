const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use(helmet());
// parse requests of content-type - application/json
// app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// database
const db = require("./models");

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept, multipart/form-data"
  );
  next();
});

// routes
app.use(require('./routes'))

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});