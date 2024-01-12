import { Prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@modelOptions({ schemaOptions: { collection: "users", timestamps: true } })
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
  })
  username: string;

  @Field(() => String)
  @Prop({
    required: true,
    unique: true,
    lowercas: true,
  })
  email: string;

  @Field(() => String)
  @Prop({
    required: true,
  })
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const UserModel = getModelForClass(User);
