const express = require('express')
const cors = require('cors');
const app = express()

require('dotenv').config()

const PORT = process.env.PORT


//Middlewares
app.use(express.json())
app.use(cors())


const server = () => {

console.log("You are listening to port:", PORT);
}


server()