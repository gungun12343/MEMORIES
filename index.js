import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRouter from "./routes/posts.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// main()
// .then(() => {
// console.log("connection successful");
// })
// .catch(err => console.log(err));

// async function main() {
// await mongoose.connect('mongodb://127.0.0.1:27017/memories');
// }

app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());

app.use("/posts", postRouter);

// const CONNECTION_URL = "mongodb+srv://memories:gunmemo123@cluster0.xkqvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => console.log("connection is successfull"))
    .catch(err => console.log(err));


    // app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
app.listen(PORT , () => {
    console.log("server is listening to port 3000");
})