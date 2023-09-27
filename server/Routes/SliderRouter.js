import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../Middleware/AuthMiddleware.js';
import sliderController from '../controllers/sliderController.js';

const SliderRouter = express.Router();

SliderRouter.get('/', asyncHandler(sliderController.getSlider));

SliderRouter.delete('/:id', protect, admin, asyncHandler(sliderController.deleteSlider));
export default SliderRouter;

SliderRouter.post('/', protect, admin, asyncHandler(sliderController.addSlider));
