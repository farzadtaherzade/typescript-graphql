import {
  Prop,
  Ref,
  getModelForClass,
  modelOptions,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { User } from "../user/user.schema";

@ObjectType()
@modelOptions({ schemaOptions: { collection: "articles", timestamps: true } })
export class Article {
  @Field(() => String)
  _id: string;

  @Prop({ required: true, unique: true })
  @Field(() => String)
  title: string;

  @Prop({ required: true })
  @Field(() => String)
  content: string;

  @Prop({ ref: () => User })
  @Field(() => User)
  owner: Ref<User>;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const ArticleModel = getModelForClass(Article);
