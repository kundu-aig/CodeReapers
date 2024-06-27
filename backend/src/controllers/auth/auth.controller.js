import UserModel from "../../models/user.model.js";
import { sendSuccessResponse, sendErrorResponse } from "../../utils/index.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';








const signUp = async (req, res) => {
  try {
    const { email, urlHandle } = req.body;

    let isUserAvailable = await UserModel.findOne({$or: [{ email: email }, { urlHandle: urlHandle }]});
    if (isUserAvailable) {
      let error = {
        message: "Please provide unique email or handle url",
      };
      return sendErrorResponse(res, 400, false, error);
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);;
    let user          = await UserModel.create(req.body);
    if (!user) {
      let error = {
        message: "Soimething went wrong while creating the user",
      };
      return sendErrorResponse(res, 400, false, error);
    }

    return sendSuccessResponse( res,200,true,"User Created Successfully",user);
  } catch (error) {
    return sendErrorResponse(res, 400, false, error);
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
      return sendErrorResponse(res, 400, false, { message: "Invalid email or password" });
    }
    

    const payload = {
        token: getJwtToken({name:"ritesh"}),
        data: user
    }

    return sendSuccessResponse(res, 200, true, "Login successful", payload);
  } catch (error) {
    return sendErrorResponse(res, 400, false, error);
  }
};

const getJwtToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}


export { login, signUp };
