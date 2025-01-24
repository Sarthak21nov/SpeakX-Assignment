import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"

const packageDefinition = protoLoader.loadSync('questions.proto',{})
const grpcObject = grpc.loadPackageDefinition(packageDefinition)
const QuestionsPackage = grpcObject.QuestionsPackage

const client = new QuestionsPackage.SearchQuestion("localhost:40000", grpc.credentials.createInsecure())
console.log("Client Started")


export default client