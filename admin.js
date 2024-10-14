import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
const router = express.Router();
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


router.post('/execute',async (req,res)=>{
    const img = req.body.img;
    const prompt = "You are an AI assistant for humans. Now this is the prompt user has given u in single quotes '" + req.body.prompt + "'Give everything in the HTML format to display and not talking about response here. give the code if user asks it. I will be using response from your side to display it in frontend on chatbot. Your response should will go under div's innerHTML so make sure u have tags that are allowed under div. Give response as i have stated in html by following rules which i have stated and if you dont follow the rules the response will not displayed properly. Also make sure response has proper spacing everywhere. Your response should be in numbered points with proper spacing between them. Every numbered points should have bullet points inside them but that really depends on the question. If user asked a specific way of answering question then follow that else give answer with numbered list and bullet points in numbered list. Proper spacing between every point so it is readable and make it possible with the help of html tags. You are free to use any tags that can come inside div tag. Just for reference use heading, paragraphs, ul, ol, or any other tag u want to use. I am not restricting you to use any tag. Just make sure it is readable and user can understand it easily.";
    console.log("prompt -> ",req.body.prompt)

    try{
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent([
prompt,
{inlineData: {data: img,
mimeType: 'image/png'}}]
);
const text = result.response.text()
console.log(text)

res.status(200).json({
    text:text
})
    }
    catch(error){
        res.status(200).json({
            text:"There has been some error. Please try again!!"
        })
    }

})

export default router;