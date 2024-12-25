// import dotenv from 'dotenv'
// dotenv.config()
// import express from 'express';
// const router = express.Router();
// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


// router.post('/execute',async (req,res)=>{
//     const img = req.body.img;
//     const userPrompt = req.body.prompt;
    
//     const prompt = `
//     System Instructions:
//     - You are an AI assistant for humans. Follow user question carefully. 
//     - Response of the length should be good and there should be flexibility in the answer.
//     - Use tag <br> in HTML for better readibility. Use number and bullet points for better readbility of response like ol, li, ul. Dont use HTML tags except two cases. 1st case is the rules i have mentioned and second case where the user has asked some code for programming. Wrap the code in code tag or pre tag what looks proper. Put the response in div tag. Never give response without div tag. Only div tag and nothing else. This div tag is named "main"
//     - About code or pre tag- Code and pre tag should be inside a dedicated div and this div should only contain code and not the explanation. That code div should have width 100%, background color white, border:2px solid black with border-radius:12px, white-space: normal, word-wrap: break-word and text color black. This div will be inside "main" div that u will return.
//     - Make sure(very important) - The code should be given as code. The frontend is processing the code given by you. So make sure code asked by the user is displayed as code in the frontend and it is wrapped inside that dediacted code div

//     User Question: ${userPrompt}
//     `;
//     console.log("prompt -> ",req.body.prompt)

//     try{
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b"});
//         const result = await model.generateContent([
// prompt,
// {inlineData: {data: img,
// mimeType: 'image/png'}}]
// );
// const text = result.response.text()
// console.log(text)

// res.status(200).json({
//     text:text
// })
//     }
//     catch(error){
//         res.status(200).json({
//             text:"There has been some error. Please try again!!"
//         })
//     }

// })

// export default router;

import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
const router = express.Router();
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

router.post('/execute', async (req, res) => {
    const img = req.body.img;
    const userPrompt = req.body.prompt;

    console.log(userPrompt)
    
    const systemPrompt = `
    System Instructions:
    - You are an AI assistant for humans. Follow user question carefully. 
    - Response of the length should be good and there should be flexibility in the answer.
    - Use tag <br> in HTML for better readibility. Use number and bullet points for better readbility of response like ol, li, ul. Dont use HTML tags except two cases. 1st case is the rules i have mentioned and second case where the user has asked some code for programming. Wrap the code in code tag or pre tag what looks proper. Put the response in div tag. Never give response without div tag. Only div tag and nothing else. This div tag is named "main"
    - About code or pre tag- Code and pre tag should be inside a dedicated div and this div should only contain code and not the explanation. That code div should have width 100%, background color white, border:2px solid black with border-radius:12px, white-space: normal, word-wrap: break-word and text color black. This div will be inside "main" div that u will return.
    - Make sure(very important) - The code should be given as code. The frontend is processing the code given by you. So make sure code asked by the user is displayed as code in the frontend and it is wrapped inside that dediacted code div

    User Question: ${userPrompt}
    `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
        let result;

        if (img !== '') {
            // If image is provided, use both image and text
            result = await model.generateContent([
                systemPrompt,
                {
                    inlineData: {
                        data: img,
                        mimeType: 'image/png'
                    }
                }
            ]);
        } else {
            // If no image is provided, use only text
            result = await model.generateContent([systemPrompt]);
        }

        const text = result.response.text();
        console.log(text);

        res.status(200).json({
            text: text
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            text: "There has been some error. Please try again!!",
            error: error.message
        });
    }
});

export default router;