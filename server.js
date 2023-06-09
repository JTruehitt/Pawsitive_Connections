const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3006;
const sequelize = require("./config/connection");
const session = require("express-session");
const helpers = require("./utils/helpers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const router = require("./controllers/index");

const exphbs = require("express-handlebars");
const hbs = exphbs.create({helpers});

const sess = {
  secret: "Super secret pawsword",
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.use((req, res) => {
  res.status('404').render('404',{ layout: '404errorpage' });
});

(async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(
        `Server listening on port ${PORT} at http://localhost:${PORT}`
      );
    });
  } catch (err) {
    console.log(`Error connecting to the database: ${err}`);
  }
})();
