import express from "express";
import dotenv from "dotenv"
import connectDatabase from "./config/MongoDb.js";

dotenv.config();
import { Server } from 'http';

connectDatabase();
const app = express();
app.use(express.json());

app.use(express.static("public"));


const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log(`server run in port ${PORT}`));
export default Server;
