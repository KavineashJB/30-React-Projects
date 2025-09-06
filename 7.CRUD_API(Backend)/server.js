const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(cors());
app.use(express.json());

const quotes = [];
let id = 1;

// Root URL
app.get("/", (req, res) => {
  res.send("Welcome!!");
});

// Get all Quotes
app.get("/api/quotes", (req, res) => {
  res.send(quotes);
});

// POST new Quote
app.post("/api/quotes", (req, res) => {
  const { text } = req.body;
  const newQuote = { id: id++, text };

  quotes.push(newQuote);

  res.status(201).json({
    status: true,
    message: "Quote created successfully!",
    content: newQuote,
  });
});

// PUT (update) existing Quote
app.put(`/api/quotes/:id`, (req, res) => {
  const quoteId = parseInt(req.params.id);
  const { text } = req.body;
  const quote = quotes.find((q) => q.id === quoteId);

  if (quote) {
    quote.text = text;
    res.status(200).json({
      status: true,
      message: "Quote Updated successfully!",
      content: quote,
    });
  } else {
    res.status(404).json({
      status: false,
      message: "Quote not found!",
    });
  }
});

// Delete a Quote
app.delete("/api/quotes/:id", (req, res) => {
  const quoteId = parseInt(req.params.id);

  const quoteIndex = quotes.findIndex((q) => q.id === quoteId);

  if (quoteIndex !== -1) {
    const deletedQuote = quotes.splice(quoteIndex, 1);
    res.status(200).json({
      status: true,
      message: "Quote deleted successfully!",
      content: deletedQuote,
    });
  } else {
    res.status(404).json({
      status: false,
      message: "Quote not found!",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
