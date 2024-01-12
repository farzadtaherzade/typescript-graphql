import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../user/user.schema";
import { SigninInputs } from "./types/signin";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { AuthInput } from "./types/auth";

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authService = new AuthService(this.userService);
  }

  @Mutation(() => User)
  async signup(@Arg("input") input: SigninInputs) {
    return await this.authService.signup(input);
  }

  @Mutation(() => String)
  async signin(@Arg("input") input: AuthInput) {
    return await this.authService.signin(input);
  }
}
