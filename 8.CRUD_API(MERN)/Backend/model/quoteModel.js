import mongoose from "mongoose";

const quoteSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  { timestamps: true }
);

export const QuoteModel = mongoose.model("Quote", quoteSchema);
