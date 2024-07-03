import express from 'express'
import cors from "cors"
import bodyparser from 'body-parser'

import adminRouter from './admin.js'

const port =3000
const app=express();
app.use(express.json());
app.use(bodyparser.json())

app.use(cors()); 
app.use('/admin',adminRouter)

app.listen(port,()=>{
    console.log("Server is listening on port "+port)
})


