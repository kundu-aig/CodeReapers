import CollateralModel from '../../models/collateral.model.js';
import UserModel from '../../models/user.model.js';
import { sendSuccessResponse, sendErrorResponse } from "../../utils/index.js";
import { ObjectId } from 'mongodb';

  // Assuming you are using express
const createCollateral = async (req, res) => {

  try {
    if (req.auth.userType !== 'market') {
      return sendErrorResponse(res, 404, false, { message: "Unauthorized access" });
    }
    req.body.agentId = ObjectId.createFromHexString(req.body.agentId);
    const isAgentExist     = await UserModel.findById(req.body.agentId);
    if (!isAgentExist) {
      return sendErrorResponse(res, 500, false, { message: "Invalid Agent Id found" });
    }


    let fileMetaData   = getFileMetaData(req, 'media');
    req.body.media     = fileMetaData;
    req.body.title     = fileMetaData.title;

    const collateral = await CollateralModel.create(req.body);

    if (!collateral) {
      return sendErrorResponse(res, 500, false, { message: "Something went wrong" });
    }
    return sendSuccessResponse(res, 201, true, 'Collateral created successfully', collateral);
  } catch (error) {
    console.error('Error creating collateral:', error);
    return sendErrorResponse(res, 500, false, error);
  }
};

const getFileMetaData = (req, field) => {
  return {
    url      : `${req.protocol}://${req.get('host')}/public/${field}s/${req.files[field][0]['filename']}`,
    fileName : req.files[field][0]['filename'],
    mediaType: req.files[field][0]['mimetype'],
    fieldname: req.files[field][0]['fieldname'],
    title    : req.files[field][0]['fieldname'] + '-' + Date.now(),
  }
}

export { createCollateral };
