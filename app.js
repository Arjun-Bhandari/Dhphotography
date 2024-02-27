if (process.env.NODE_ENV != "production") {
  require("dotenv").config()
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const favicon = require('serve-favicon')
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const port = 3000;
const weddingRouter = require("./routes/wedding.router.js");
const preweddingRouter = require("./routes/prewedding.router.js");
const postweddingRouter = require("./routes/postwedding.router.js");
const fashionRouter = require("./routes/fashion.router.js");
const birthdayRouter = require("./routes/birthday.router.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const multer = require('multer')
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage });
const Image = require("./models/image.js");
const User = require("./models/user.js");
const userRouter = require("./routes/user.route.js")
const { isLoggedIn, isOwner, validateImage } = require("./middleware.js");


const MONGO_URL = process.env.MONGO_URL;
main().then(() => {
  console.log("DB connected");
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
};



app.use(favicon(path.join(__dirname, 'public', '/Assests/favicon.ico')))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));


const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: {
    secret: process.env.MONGO_STORE_SECRET_KEY,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error in MONGO SESSION STORE", err);
});

const sessionOption = {
  store,
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//ROUTES
app.use("/wedding",weddingRouter);
app.use("/prewedding",preweddingRouter);
app.use("/postwedding",postweddingRouter);
app.use("/fashion",fashionRouter);
app.use("/birthday",birthdayRouter);
app.use("/",userRouter);

app.get("/", (req, res) => {
  res.send("Server Working Fine");
});
app.get("/home", (req, res) => {
  res.render("pages/home.ejs");
})
app.get("/service", (req, res) => {
  res.render("pages/services.ejs");
})
app.get("/contact",isLoggedIn, (req, res) => {
  res.render("pages/contact.ejs");
})

//create
app.post("/", upload.single("Image[image]"), validateImage, async (req, res, next) => {
  try {
    const url = req.file.path;
    const filename = req.file.filename;
    const newImage = new Image(req.body.Image);
    newImage.image = { url, filename };
    const saveImage = await newImage.save();
    console.log(saveImage);
    req.flash("success", "New Images Added");
    if (req.body.Image.type === "wedding") {
      res.redirect("/wedding");
    } else if (req.body.Image.type === "prewedding") {
      res.redirect("/prewedding");
    } else if (req.body.Image.type === "postwedding") {
      res.redirect("/postwedding");
    } else if (req.body.Image.type === "birthday") {
      res.redirect("/birthday");
    } else if (req.body.Image.type === "fashion") {
      res.redirect("/fashion");
    } else {
      next(error);
    }
  } catch (error) {
    console.log(error.stack);
    res.status(500).send("Error uploading files");
  }
});

app.get("/admin", (req, res) => {
  res.render("pages/create.ejs")
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong!" } = err;
  res.status(statusCode).render("pages/error.ejs", { message });
});

app.listen(port, () => {
  console.log(`app listining on ${port}`);
})