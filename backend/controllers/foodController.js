import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item

const addFood = async (req, res) => {
    
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}
//all food list
const listFood = async (req, res) => {
     try {
         const foods = await foodModel.find({});
         res.json({success:true,data:foods})
     } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
     }
}
//remove food items
const removeFood = async (req, res) => {
     try {
         const food = await foodModel.findById(req.body.id);
         fs.unlink(`uploads/${food.image}`, () => { })
         
         await foodModel.findByIdAndDelete(req.body.id);
         res.json({success:true,message :"Food Removed"})
     } catch (error) {
         console.log(error);
         res.json({success:false,message:"Error"})
        
     }
}
 
// Search items (new function for search)
const searchItems = async (req, res) => {
    try {
        const query = req.query.query;  // Extract query from URL parameters
        if (!query) {
            return res.json({ success: false, message: "No search query provided" });
        }

        // Perform search in the database using regex to match food name
        const foodItems = await foodModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },  // Case-insensitive search for name
                { description: { $regex: query, $options: 'i' } } // Case-insensitive search for description
            ]
        });


        // Return the matching food items
        res.json({ success: true, data: foodItems });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching food items" });
    }
};

export {addFood,listFood,removeFood,searchItems}