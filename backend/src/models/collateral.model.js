import mongoose from "mongoose";

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
        enum: LOB,
        required: true
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    url: {
        type: String,
        required: true
    },

});

const collateralModel = mongoose.model("collateral", collateralSchema);
export default collateralModel;
