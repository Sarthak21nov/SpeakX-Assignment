import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"
import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import { AllQuestions, getQuestion, getQuestionsByType } from "./Controller/getQuestion.js"
import client from "./client.js"
import mongoose from "mongoose"

const app = express()
dotenv.config()

//GRPC Server
const packageDefinition = protoLoader.loadSync('questions.proto',{})
const grpcObject = grpc.loadPackageDefinition(packageDefinition)
const QuestionsPackage = grpcObject.QuestionsPackage

const server = new grpc.Server()
server.addService(QuestionsPackage.SearchQuestion.service, {
    "getQuestion": getQuestion,
    "getAllQuestion": AllQuestions,
    "getQuestionsByTypes": getQuestionsByType
});
server.bindAsync('0.0.0.0:40000', grpc.ServerCredentials.createInsecure(), (err,response)=>{
    if(err){
        console.log("Error Starting the GRPC Server")
    } else{
        console.log("GRPC Server started on Port 40000")
        server.start()
    }
})


//MIDDLEWARES
app.use(cors())
app.use(express.json())

//ROUTES
app.get('/questions', (req, res) => {
    const { query, page, limit } = req.query;
    client.getQuestion({
        query,
        page: page || 1,
        limit: limit || 10
    }, (err, response) => {
        if (err) {
            console.error("Error from gRPC client:", err);
            return res.status(500).json({ status: false, error: "Error communicating with gRPC client" });
        }
        console.log("Response from gRPC client:", JSON.stringify(response));
        res.status(200).json({ status: true, message: "Data sent to client", data: response });
    });
});

app.get('/getAll', (req, res) => {
    const { page, limit } = req.query;
    client.getAllQuestion({
        page: page || 1,
        limit: limit || 10
    }, (err, response) => {
        if (err) {
            console.error("Error from gRPC client:", err);
            return res.status(500).json({ status: false, error: "Error communicating with gRPC client" });
        }
        console.log("Response from gRPC client:", JSON.stringify(response));
        res.status(200).json({ status: true, message: "Data sent to client", data: response });
    });
});

app.get('/type', (req, res) => {
    const { type, page, limit } = req.query;
    client.getQuestionsByTypes({
        type,
        page: page || 1,
        limit: limit || 10
    }, (err, response) => {
        if (err) {
            console.error("Error from gRPC client:", err);
            return res.status(500).json({ status: false, error: "Error communicating with gRPC client" });
        }
        console.log("Response from gRPC client:", JSON.stringify(response));
        res.status(200).json({ status: true, message: "Data sent to client", data: response });
    });
});

//MONGODB SERVER
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Successfully connected to MongoDB Database")
}).catch((err)=>{
    console.log("Error connecting to Database")
})

//EXPRESS SERVER
const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log("Express server started on Port 4000");
})