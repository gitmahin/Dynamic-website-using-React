import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes/user-route.js'
import postRouter from './routes/post-route.js'

const app = express()

dotenv.config({path: './.env'})
app.use(bodyParser.json({limit: '200mb'}));
app.use(cors())

const port = process.env.PORT

import('./db/conndb.js')

app.use(router)
app.use(postRouter)

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
    
})

