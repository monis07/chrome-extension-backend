import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
const router = express.Router();
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


router.post('/execute',async (req,res)=>{
    const img = req.body.img;
    const userPrompt = req.body.prompt;
    
    const prompt = `
    System Instructions:
    - You are an AI assistant for humans. Follow user question carefully. 
    - Response of the length should be good and there should be flexibility in the answer.
    - Use tag <br> in HTML for better readibility. Use number and bullet points for better readbility of response like ol, li, ul. Dont use HTML tags except two cases. 1st case is the rules i have mentioned and second case where the user has asked some code for programming. Wrap the code in code tag or pre tag what looks proper. Put the response in div tag. Never give response without div tag. Only div tag and nothing else. This div tag is named "main"
    - About code or pre tag- Code and pre tag should be inside a dedicated div and this div should only contain code and not the explanation. That code div should have width 100%, background color white, border:2px solid black with border-radius:12px, white-space: normal, word-wrap: break-word and text color black. This div will be inside "main" div that u will return.
    - Make sure(very important) - The code should be given as code. The frontend is processing the code given by you. So make sure code asked by the user is displayed as code in the frontend and it is wrapped inside that dediacted code div

    User Question: ${userPrompt}
    `;
    console.log("prompt -> ",req.body.prompt)

    try{
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b"});
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

// You are an AI assistant for humans. Follow user instructions carefully. if user asks some question that is not relevant to the image then answer it according to the question asked else take image attached in consideration. Response of the length should be good. Now this is the prompt user has given u in single quotes '" + req.body.prompt + "'Give everything in the HTML format to display and not talking about response here. give the code if user asks it. I will be using response from your side to display it in frontend on chatbot. Your response will go under div's innerHTML so make sure u have tags that are allowed under div. Give response as i have stated in html by following rules which i have stated and if you dont follow the rules the response will not displayed properly. Also make sure response has proper spacing everywhere. Your response should be in numbered points with proper spacing between them. Every numbered points should have bullet points inside them but that really depends on the question. Proper spacing between every point so it is readable and make it possible with the help of html tags. You are free to use any tags that can come inside div tag. Just for reference use heading, paragraphs, ul, ol, or any other tag u want to use. I am not restricting you to use any tag. Just make sure it is readable and user can understand it easily.