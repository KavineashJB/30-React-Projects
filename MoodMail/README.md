# MoodMail Generator

MoodMail Generator is a simple React component-based application that generates an email template based on the user's current mood. It dynamically sets the email subject and footer signature according to the mood input, providing a quick and personalized way to draft mood-based email content.

---

## Features

- Input your current mood.
- Automatically generates an email subject and footer based on mood keywords.
- Supports moods like happy, sad, angry (or anger), and a default mood.
- Ability to reset and input a new mood.
- Clean and simple UI using reusable components.

---

## Components

- **Home.jsx**  
  Main container component that handles the mood state, generates the email subject and footer, and toggles between input and output views.

- **MoodInput.jsx**  
  Presents an input field and a generate button to collect the user's mood.

- **MoodOutput.jsx**  
  Displays the generated email subject and footer with a reset button.

---

## Usage

1. Enter your mood in the input box.
2. Click **Generate Email Template**.
3. View the generated subject and footer based on your mood.
4. Click **Reset** to clear and start over.

---

## Mood to Email Mapping

| Mood Keyword(s) | Email Subject             | Footer Signature             |
| --------------- | ------------------------- | ---------------------------- |
| happy           | Feeling Grateful Today 😊 | Spread Happiness...          |
| sad             | Just another tough day!   | Time will fade everything... |
| angry / anger   | UnControlled Emotion!     | Deep Breaths...              |
| Others          | Awesome Mood!             | Catch you later...           |

---

## Tech Stack

- React (Functional Components + Hooks)
- TypeScript (for type safety)
- Tailwind CSS (for styling, inferred from class names)

---

## Installation & Running Locally

```bash
# Clone the repo
git clone <repository-url>

# Install dependencies
npm install

# Start the development server
npm run dev
```
