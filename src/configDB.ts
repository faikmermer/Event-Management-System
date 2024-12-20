const mongoose = require("mongoose");

export const connectDB = async (): Promise<any> => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
