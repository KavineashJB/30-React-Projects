import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { QuoteModel } from "./model/quoteModel.js";

const PORT = process.env.PORT || 4000;
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

// Quotes
// Get all quotes
app.get("/api/quotes", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const quotes = await QuoteModel.find()
      .sort({ createdAt: -1 })
      // should use (page-1)*limit because of the operator precedence
      .skip((page - 1) * limit)
      .limit(limit);

    const totalQuotes = await QuoteModel.countDocuments();

    // console.log("quotes: ", quotes);
    res.status(200).json({
      success: true,
      message: "Fetched successfully",
      content: quotes,
      totalQuotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch",
      error,
    });
  }
});

app.get("/api/quotes/filter", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const filter = req.query.filter || "";
    let order = req.query.order || "-1";

    if (typeof filter !== "string") {
      return res.status(400).json({
        success: false,
        message: "Filter query parameter is required",
      });
    }

    if (!order || typeof order !== "string") {
      order = "-1";
    }

    const query = {
      text: { $regex: new RegExp(`${filter}`, "i") },
    };
    const quotes = await QuoteModel.find(query)
      .sort({ createdAt: parseInt(order) })
      // should use (page-1)*limit because of the operator precedence
      .skip((page - 1) * limit)
      .limit(limit);

    const totalQuotes = await QuoteModel.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Filtered quotes fetched successfully.",
      content: quotes,
      totalQuotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Filtered Quotes",
      error,
    });
  }
});

// Post a Quote
app.post("/api/quotes", async (req, res) => {
  try {
    const { text, filter } = req.body;

    if (!text.trim()) {
      res.status(400).json({
        success: false,
        message: "Text is Required",
      });
    }

    const newQuote = await QuoteModel.create({ text: text.trim() });

    res.status(201).json({
      success: true,
      message: "Quote Inserted successfully",
      content: newQuote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to insert Quote",
      error: error,
    });
  }
});

// Put(Update) a Quote
app.put("/api/quotes/:id", async (req, res) => {
  try {
    const quoteId = req.params.id;
    const { text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(quoteId)) {
      return res.status(400).json({
        success: false,
        message: "Id is Invalid",
      });
    }

    if (!text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Text is Required",
      });
    }

    const UpdatedQuote = await QuoteModel.findByIdAndUpdate(
      quoteId,
      { text: text.trim() },
      { new: true, runValidators: true }
    );

    if (!UpdatedQuote) {
      return res.status(404).json({
        success: false,
        message: "Id not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quote Updated successfully",
      content: UpdatedQuote,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Failed to Update Quote!",
      error,
    });
  }
});

// Delete a Quote
app.delete("/api/quotes/:id", async (req, res) => {
  try {
    const quoteId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(quoteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }

    const deletedQuote = await QuoteModel.findByIdAndDelete(quoteId);
    if (!deletedQuote) {
      return res.status(404).json({
        success: false,
        message: "Id not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quote deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete a Quote",
      error,
    });
  }
});

try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("MongoDB connected successfully!");
} catch (error) {
  console.log("MongoDB connection Failed:", error);
}

app.listen(PORT, () => {
  console.log(`server listening on the port ${PORT}`);
});
