import mongoose from "mongoose";
import {LOB,CATEGORY} from '../constant.js'
const collateralSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    mediaType: {
        type: String,
    },
    lob: {
        type: String,
        enum: LOB,
        required: true
    },
    category: {
        type: String,
        enum: CATEGORY,
        required: true
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    media: {
        type: Object,
        required: true
    },

});

const collateralModel = mongoose.model("collateral", collateralSchema);
export default collateralModel;
