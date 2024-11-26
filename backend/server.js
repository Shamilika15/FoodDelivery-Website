import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import searchRouter from "./routes/searchRoute.js"



// app config
const app = express()
const port = 4000


//middleware
//request frontend to backedn pass through this 
app.use(express.json())
//access backend from front end
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api",searchRouter)


app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})
//mongodb+srv://shamilikasiva15:<db_password>@cluster0.jcp29.mongodb.net/?