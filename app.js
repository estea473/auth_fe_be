var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var dotenv = require("dotenv");
var app = express();
var port = 	3000;

var authRouter = require("./router/authRouter");

const { notFound, errorHandler } = require("./middleware/errorHandler");

dotenv.config();

// middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  credentials: true, // Allow cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));

app.use("/", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`port : ${port}`);
});

mongoose.connect(process.env.DB, {}).then(() => {
  console.log("terkoneksi");
});