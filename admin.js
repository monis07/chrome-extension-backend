import express from 'express';
const router = express.Router();
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI('process.env.GOOGLE_API_KEY');


router.post('/execute',async (req,res)=>{
    const img = req.body.img;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent([
"Extract text from this photo",
{inlineData: {data: img,
mimeType: 'image/png'}}]
);
const text = result.response.text()
console.log(text)

res.status(200).json({
    text:text
})

})

export default router;