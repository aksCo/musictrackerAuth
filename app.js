const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const connectDB = require('./config/db');
var cors = require ('cors');
const path = require("path");
const app = express();
//Bodyparser Middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
//cors
app.use(cors({ origin: true, credentials: true }));

//DB Config
const db = require("./config/keys").mongoURI;
//connect database
//connectDB();
//cors

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// routes
const songs = require('./routes/api/songs');

//use Routes
app.use('/api/songs', songs);
app.use("/api/users", users);


// Serve static folder
if(process.env.NODE_ENV === 'production')
{
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req,res)=>{
res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
