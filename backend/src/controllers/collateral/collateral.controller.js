import UserModel from "../../models/user.model.js";
import { sendSuccessResponse, sendErrorResponse } from "../../utils/index.js";



const createCollateral = async (req, res) => {
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



export { createCollateral };
