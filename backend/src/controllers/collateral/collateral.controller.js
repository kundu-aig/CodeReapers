import path from 'path';
import CollateralModel from '../../models/collateral.model.js';
import UserModel from '../../models/user.model.js';
import { sendSuccessResponse, sendErrorResponse, getPaginatedData } from "../../utils/index.js";
import { ObjectId } from 'mongodb';

const listCollateral = async (req, res) => {
  try {
    const { lob, userId, userType } = req.auth;
    const { page = 1, limit = 10 } = req.query;

    if (userType !== "agent") {
      return sendErrorResponse(res, 401, false, { message: 'Unauthorized access' });
    }
    // Ensure page and limit are numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      return sendErrorResponse(res, 400, false, { message: 'Page and limit should be valid numbers' });
    };
    const paginationData = await getPaginatedData(CollateralModel, pageNumber, limitNumber, { $and: [{ lob: lob }, { agentId: ObjectId.createFromHexString(userId) }] });

    return sendSuccessResponse(res, 200, true, 'Collateral list fetched successfully', paginationData);
  } catch (error) {
    console.error('Error fetching collateral list:', error);
    return sendErrorResponse(res, 500, false, error);
  }
};

const createCollateral = async (req, res) => {

  try {
    if (req.auth.userType !== 'market') {
      return sendErrorResponse(res, 404, false, { message: "Unauthorized access" });
    }
    req.body.agentId = ObjectId.createFromHexString(req.body.agentId);
    const isAgentExist = await UserModel.findById(req.body.agentId);
    if (!isAgentExist) {
      return sendErrorResponse(res, 500, false, { message: "Invalid Agent Id found" });
    }


    let fileMetaData = getFileMetaData(req, 'media');
    req.body.media = fileMetaData;
    req.body.title = fileMetaData.title;
    req.body.lob = isAgentExist.lob;
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

const searchCollateral = async (req, res) => {
  try {
    const { title, urlHandle } = req.params
    const collateral = await CollateralModel.findOne({ title: title }).populate({
      path: 'agentId',
      select: 'name firstName lastName email lob urlHandle logo banner tagLine'
    })
    if (!collateral) {
      return sendErrorResponse(res, 400, false, { message: "collateral not found" });
    }
    return sendSuccessResponse(res, 200, true, 'Collateral list fetched successfully', collateral);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllAgentList = async (req, res) => {
  try {
    if (req.auth.userType !== 'market') {
      return sendErrorResponse(res, 404, false, { message: "Unauthorized access" });
    }
    const { lob } = req.params;
    const agentList = await UserModel.find({ lob: lob })
    return sendSuccessResponse(res, 200, true, 'Agent list fetched successfully', agentList);
  } catch (error) {
    console.error('Error fetching agent list:', error);
    return sendErrorResponse(res, 500, false, error);
  }
};

const getFileMetaData = (req, field) => {
  return {
    url: `${req.protocol}://${req.get('host')}/public/${field}s/${req.files[field][0]['filename']}`,
    fileName: req.files[field][0]['filename'],
    mediaType: req.files[field][0]['mimetype'],
    fieldname: req.files[field][0]['fieldname'],
    title: req.files[field][0]['fieldname'] + '-' + Date.now() + Math.floor(1000 + Math.random() * 9000),
  }
}

const generateSearchQuery = (body) => {
  const query = {};
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
      query[key] = body[key];
    }
  }
  return query;
}


export { createCollateral, listCollateral, getAllAgentList, searchCollateral };
