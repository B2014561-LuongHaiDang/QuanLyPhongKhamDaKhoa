const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json())  
app.use(cookieParser())

routes(app);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


app.listen(port, () => {
    console.log('Server is running in port:', + port)
})