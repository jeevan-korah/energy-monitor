import dotenv from "dotenv"
import express from "express"
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Energy Monitor backend is running.")
})

app.use("/api/auth", authRoutes )

connectDb().then(()=>(
    app.listen(PORT, ()=>{
        console.log(`Server is running on http://localhost:${PORT}`);    
    })
)).catch(err =>{
    console.log(`Failed to connect to DB : ${err}`);
    
})
