const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
const app = express();
require("dotenv").config();

const corsOptions = {
  origin: "https://james-shopping-mall.netlify.app",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", indexRouter);

const mongoURI = process.env.MONGODB_URI_PROD;
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log("DB connection failed", err));

app.listen(process.env.PORT || 4000, () => {
  console.log("server on");
});
