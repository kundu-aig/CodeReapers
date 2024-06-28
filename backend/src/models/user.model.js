import mongoose from "mongoose";
import {USER_TYPE,LOB} from '../constant.js'

const userSchema = new mongoose.Schema({
  firstName: {
    type    : String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type    : String,
    required: true,
  },
  password: {
    type    : String,
    required: true,
  },
  userType: {
    type    : String,
    enum    : USER_TYPE,
    required: true,
  },
  lob: {
    type    : String,
    enum    : LOB,
    required:true
  },
  urlHandle: {
    type    : String,
  },
  logo: {
    type    : Object,
  },
  banner: {
    type    : Object,
  },
  tagLine: {
    type: String,
  },
});

const UserModel = mongoose.model("user", userSchema);
export default UserModel;
