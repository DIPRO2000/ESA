const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const port=process.env.PORT;
const bodyParser = require("body-parser");
const cors = require("cors");
const Seat=require("./models/seating")
const db_uri = process.env.DB_URI;

mongoose.connect(db_uri);
const db = mongoose.connection;

db.once("open", async() => {
  console.log("Mongodb Connection Successful");
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: "*",
    credentials: true,
  })
);

app.post("/add-seat", async (req, res) => {
    try {
    const{name,enrollment_number,department,year}=req.body;
      const newSeat = new Seat({
        name,
        enrollment_number,
        department,
        year,
      });
  
       await newSeat.save();
      res.status(201).json({ message: "Seat added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding seat", error: error.message });
    }
  });

  app.get("/seats", async (req, res) => {
    try {
      const { department,year} = req.query;
  
      const seats = await Seat.find({ department,year }).sort({ enrollment_number: 1 });
  
      res.status(200).json({ seats });
  
    } catch (error) {
      res.status(500).json({ message: "Error fetching seats", error: error.message });
    }
  });
  

  app.get("/student-seat", async (req, res) => {
    try {
      const{name,enrollment_number}=req.query;
      const seats = await Seat.findOne({name,enrollment_number});
      if(!seats){
        res.status(404).json({ message: "Seat not found" });
      }
      
    res.status(200).json({ seats });

    } catch (error) {
      
      res.status(500).json({ message: "Error fetching seats", error: error.message });
    }
  });

app.listen(port,()=>{
    console.log(`server is running!`);
})