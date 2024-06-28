import express from 'express';
import {signUp,login}  from './auth.controller.js';
import imageUploader from "../../utils/imageUploader.js"

const router = express.Router();

// API routes
router.post(`/signup`,imageUploader.upload('small'), signUp);
router.post(`/login`, login);


// Export the router
export default router;