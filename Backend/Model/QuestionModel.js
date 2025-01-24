import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    }
})
const Questions = mongoose.model('Questions', QuestionSchema)

export default Questions;