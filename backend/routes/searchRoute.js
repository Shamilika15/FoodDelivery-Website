import express from 'express';
import { addFood, listFood, removeFood, searchItems } from "../controllers/foodController.js"; // Import searchItems from foodController.js

const searchRouter = express.Router();

// Use the searchItems function from foodController.js
searchRouter.get('/search', searchItems);

export default searchRouter;
