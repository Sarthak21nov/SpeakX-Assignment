import Questions from "../Model/QuestionModel.js";

export const getQuestion = async (call, callback) => {
    const { query, page = 1, limit = 10 } = call.request;
    try {
        const filter = query ? { title: { $regex: query, $options: "i" } } : {};
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        const questionData = await Questions.find(filter)
            .skip((pageNum - 1) * limitNum) // Skip documents for previous pages
            .limit(limitNum); // Limit to specified number of documents

        const totalCount = await Questions.countDocuments(filter); // Total count for pagination metadata

        callback(null, {
            success: true,
            questions: questionData,
            currentPage: pageNum,
            totalPages: Math.ceil(totalCount / limitNum),
            totalCount
        });
    } catch (err) {
        callback(null, {
            success: false,
            message: "Unable to fetch the Data"
        });
    }
};

export const AllQuestions = async (call, callback) => {
    const { page = 1, limit = 10 } = call.request;
    try {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        const QuestionsData = await Questions.find()
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .select("title type solution");

        const totalCount = await Questions.countDocuments();

        callback(null, {
            success: true,
            questions: QuestionsData,
            currentPage: pageNum,
            totalPages: Math.ceil(totalCount / limitNum),
            totalCount
        });
    } catch (err) {
        callback(null, {
            success: false,
            message: "Unable to Fetch the data"
        });
    }
};    

export const getQuestionsByType = async (call, callback) => {
    const { type, page = 1, limit = 10 } = call.request;
    try {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        const questionsData = await Questions.find({ type })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);

        const totalCount = await Questions.countDocuments({ type });

        callback(null, {
            success: true,
            questions: questionsData,
            currentPage: pageNum,
            totalPages: Math.ceil(totalCount / limitNum),
            totalCount
        });
    } catch (err) {
        callback(null, {
            success: false,
            message: "Unable to fetch the Data"
        });
    }
};