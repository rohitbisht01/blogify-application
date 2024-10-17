const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongodb host name:", connection.connection.host);
  } catch (error) {
    console.log("Error conntecting database", error);
  }
};

module.exports = connectDb;
