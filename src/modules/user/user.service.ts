import { hashSync } from "bcrypt";
import { SigninInputs } from "../auth/types/signin";
import { UserModel } from "./user.schema";
import mongoose from "mongoose";

export class UserService {
  async createUser(dto: SigninInputs) {
    return UserModel.create(dto);
  }

  async findUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async findUserById(id: mongoose.Types.ObjectId) {
    return UserModel.findById(id);
  }
}
