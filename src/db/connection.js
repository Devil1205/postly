const mongoose = require("mongoose");

export const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error while connecting to database");
  }
};
