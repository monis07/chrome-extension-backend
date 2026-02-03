# BrowzerAI - Backend

The backend server for the BrowzerAI Chrome extension. It acts as a bridge between the Chrome extension and Google's Gemini AI, processing user prompts and optional screenshot images to return intelligent, formatted responses.

## Tech Stack

- **Node.js** with **Express.js** - Web server
- **Google Generative AI (Gemini 1.5 Flash 8B)** - AI model
- **CORS** - Cross-origin request handling
- **Body-parser** - Request body parsing
- **dotenv** - Environment variable management

## Project Structure

```
chrome-extension-backend/
├── index.js       # Express server setup and middleware configuration
├── admin.js       # API route handler for AI prompt execution
├── package.json
└── .env           # Environment variables (not committed)
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root of this folder:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

3. Start the server:
   ```bash
   node index.js
   ```

   The server runs on port **3000** by default.

## API

### `POST /admin/execute`

Sends a user prompt (with an optional screenshot) to Gemini and returns a formatted HTML response.

**Request Body:**
```json
{
  "img": "base64-encoded-png-string-or-empty",
  "prompt": "user question"
}
```

- `img` - Base64-encoded PNG image data. Pass an empty string `""` for text-only queries.
- `prompt` - The user's question or instruction.

**Response:**
```json
{
  "text": "<div class='main'>...formatted HTML response...</div>"
}
```

**Error Response (500):**
```json
{
  "text": "There has been some error. Please try again!!",
  "error": "error message"
}
```

## Deployment

The production backend is deployed on [Render](https://render.com) at:
```
https://browzerai-backend.onrender.com
```
