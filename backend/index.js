const express = require("express");
const blogRoute = require("./routes/blog");
const userRoute = require("./routes/user");
const connectDb = require("./db/connectDb");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const app = express();
connectDb();

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
