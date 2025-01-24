import { MongoClient, ObjectId } from "mongodb";
import questions from "../Backend/Data/speakx_questions.json" assert { type: 'json'}
import dotenv from "dotenv"

dotenv.config()
const client = new MongoClient(process.env.MONGO_URI)


// function to load the Data
async function loadData(){
    try{
        await client.connect();
        const db = client.db("question_db")
        const collection = db.collection("questions")

        // Converted $oid and $sid to ObjectId and SiblingId 
        const transformedQuestions = questions.map((question) => {
            if (question._id && question._id.$oid) {
                question._id = new ObjectId(question._id.$oid); 
            }
            if (question.siblingId && question.siblingId.$oid) {
                question.siblingId = new ObjectId(question.siblingId.$oid);
            }
            return question;
        });

        await collection.insertMany(transformedQuestions)
        console.log("Data Added Successfully")
    } finally {
        await client.close()
    }
}

loadData()