const express = require("express");
const blogRoute = require("./routes/blog");
const userRoute = require("./routes/user");
const connectDb = require("./db/connectDb");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// const __dirname = path.resolve();

const app = express();
connectDb();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/user", userRoute);

// Serve frontend files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
