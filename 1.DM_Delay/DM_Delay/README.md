# DM Delay

A simple React component that allows users to send a message with a customizable delay timer. The message is displayed only after the specified delay, and the user can cancel the sending process before the timer completes.

---

## Features

- **Message input:** Type any message to be sent.
- **Delay input:** Specify the delay time in seconds before the message is sent.
- **Live countdown:** Displays a countdown timer showing the remaining seconds before the message is sent.
- **Cancel sending:** Allows the user to cancel the delayed sending before completion.
- **Success notification:** Displays the sent message with a success message after the delay.

---

## How It Works

1. User types a message in the textarea.
2. User sets a delay (in seconds) using the delay input field.
3. When the user clicks **Send with Delay**, a countdown starts.
4. The message is sent and displayed after the countdown ends.
5. User can cancel the sending during the countdown.

---

## Installation

1. Clone the repository or copy the `MessageForm` component into your React project.
2. Make sure you have React and Tailwind CSS configured in your project.
3. Import and use the `MessageForm` component wherever needed.

```jsx
import MessageForm from "./components/MessageForm";

function App() {
  return (
    <div>
      <MessageForm />
    </div>
  );
}

export default App;
```
