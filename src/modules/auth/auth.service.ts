import { SigninInputs } from "./types/signin";
import { UserService } from "../user/user.service";
import bcrypt from "bcrypt";
import { AuthInput } from "./types/auth";
import { ApolloError } from "apollo-server";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  async signup(signupInput: SigninInputs) {
    const user = await this.userService.findUserByEmail(signupInput.email);

    if (user) throw new ApolloError("user alreadt exist");
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(String(signupInput.password), salt);
    signupInput.password = hashPassword;
    return this.userService.createUser(signupInput);
  }

  async signin(signinInput: AuthInput) {
    const user = await this.userService.findUserByEmail(signinInput.email);
    if (!user) throw new ApolloError("username or password is wrong");
    const comparePassword = await bcrypt.compare(
      signinInput.password,
      user.password
    );
    if (!comparePassword)
      throw new ApolloError("username or password is wrong");

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY || "secret",
      { expiresIn: "10day" }
    );
    return accessToken;
  }
}
