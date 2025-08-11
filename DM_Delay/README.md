# DM Delay

A simple React + TypeScript application that allows you to send a message with a custom delay.  
You can also cancel the message before it gets sent.  

## Features
- ⏳ **Send with Delay** — Specify the delay time in seconds before the message is sent.
- ❌ **Cancel Sending** — Stop a scheduled message before the timer ends.
- ✅ **Success Display** — Shows the sent message once the delay completes.
- 🎨 Styled with Tailwind CSS and reusable UI components.

## Tech Stack
- **React** (with Hooks)
- **TypeScript**
- **Tailwind CSS**
- **Vite** for fast development

## Components
- **MessageForm** — Main form to enter message, delay, and control sending.
- **UI Components** —  
  - `Textarea`
  - `Input`
  - `Button`

## How It Works
1. Enter your message in the text area.
2. Enter the delay in seconds.
3. Click **"Send with Delay"**.
4. The message will be displayed after the delay time.
5. You can cancel the message while it's waiting to be sent.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
