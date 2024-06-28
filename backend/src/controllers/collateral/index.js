import express from 'express';
import imageUploader from "../../utils/imageUploader.js"
import {createCollateral,listCollateral,getAllAgentList,searchCollateral}  from './collateral.controller.js';
import {checkForFiles} from '../../utils/index.js'


const router = express.Router();

// API routes

router.get(`/agentlist/:lob`,getAllAgentList);
router.get(`/`,listCollateral);
router.post(`/`,checkForFiles, imageUploader.upload('large'),createCollateral);
router.post(`/:title` ,searchCollateral);





// Export the router
export default router;