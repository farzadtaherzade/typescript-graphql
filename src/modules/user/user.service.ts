import { hashSync } from "bcrypt";
import { SigninDto } from "../auth/types/signin";
import { UserModel } from "./user.schema";
import mongoose from "mongoose";

export class UserService {
  async createUser(dto: SigninDto) {
    return UserModel.create(dto);
  }

  async findUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async findUserById(id: mongoose.Types.ObjectId) {
    return UserModel.findById(id);
  }
}
