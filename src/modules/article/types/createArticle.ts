import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateArticle {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  content: string;

  owner: any;
}
