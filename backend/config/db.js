import mongoose from "mongoose";

 export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://shamilikasiva15:kFHiNRwr3AQBijQA@cluster0.jcp29.mongodb.net/food-delivery').then(() => console.log("DB connected"));
                            
}
