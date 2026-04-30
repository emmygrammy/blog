import Question from "../Models/QuestionModel.js";


// Create a new question(admin)
export const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);

    return res.status(201).json({
      success: true,
      data: question,
    });

  } catch (err) {

    // MongoDB duplicate error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Question for this year already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get all questions(public)
export const getAllQuestions = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 10); // cap limit
    const skip = (page - 1) * limit;

    const [questions, total] = await Promise.all([
      Question.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(), // ⚡ important for speed

      Question.countDocuments()
    ]);

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: questions,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Get a question by ID(public)
export const getSingleQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id).lean();

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.json({
      success: true,
      data: question,
    });

  } catch (err) {
    // Handle invalid MongoDB ObjectId
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update a question(admin)
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,          // return updated doc
        runValidators: true // enforce schema validation
      }
    ).lean();

    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.json({
      success: true,
      message: "Question updated successfully",
      data: updatedQuestion,
    });

  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete a question(admin)
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    await question.deleteOne();

    res.json({
      success: true,
      message: "Question deleted successfully",
    });

  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};