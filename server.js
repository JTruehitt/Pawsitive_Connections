const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3006;

const app = express();
const router = require("./controllers/index");

const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.use((req, res) => {
  res.send("Replace me with 404 page.");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} at http://localhost:${PORT}`);
});
