import dotenv from "dotenv";
import express from "express";
import router from "./routes/routes";

dotenv.config();

const connectDB = require("./configDB");
connectDB();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Server running on port ${port}`));
