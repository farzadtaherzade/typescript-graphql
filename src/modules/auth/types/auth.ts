import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class AuthInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
