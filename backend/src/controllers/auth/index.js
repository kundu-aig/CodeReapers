import express from 'express';
import {signUp,login}  from './auth.controller.js';


const router = express.Router();

// API routes
router.post(`/signup`, signUp);
router.post(`/login`, login);


// Export the router
export default router;