import UserModel from "../../models/user.model.js";
import { sendSuccessResponse, sendErrorResponse } from "../../utils/index.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signUp = async (req, res) => {
  try {
    const { email, urlHandle } = req.body;

    let isUserAvailable = await UserModel.findOne({ $or: [{ email: email }, { urlHandle: urlHandle }] });
    if (isUserAvailable) {
      let error = {
        message: "Please provide unique email or handle url",
      };
      return sendErrorResponse(res, 400, false, error);
    }
    if (req.body.userType === 'agent') {
      req.body.logo = await getUploadedFileUrl(req, 'logo');
      req.body.banner = await getUploadedFileUrl(req, 'banner');
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);;
    let user = await UserModel.create(req.body);
    if (!user) {
      let error = {
        message: "Soimething went wrong while creating the user",
      };
      return sendErrorResponse(res, 400, false, error);
    }

    const payload = {
      token: getJwtToken(generateTokenPayload(user)),
      data: user
    }
    return sendSuccessResponse(res, 200, true, "User Created Successfully", payload);
  } catch (error) {
    return sendErrorResponse(res, 500, false, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 400, false, { message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, 401, false, { message: "Invalid email or password" });
    }


    const payload = {
      token: getJwtToken(generateTokenPayload(user)),
      data: user
    }

    return sendSuccessResponse(res, 200, true, "Login successful", payload);
  } catch (error) {
    return sendErrorResponse(res, 500, false, error);
  }
};

const generateTokenPayload = (data) => {
  return { userId: data._id, userType: data.userType, lob: data.lob }
}

const getJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
}


const getUploadedFileUrl = async (req, field) => {
  return {
    url: `${req.protocol}://${req.get('host')}/public/${field}s/${req.files[field][0]['filename']}`,
    fileName: req.files[field][0]['filename'],

  }

}


export { login, signUp };
