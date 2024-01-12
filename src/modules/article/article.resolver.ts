import { ArticleService } from "./article.service";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Article } from "./article.schema";
import { CreateArticle } from "./types/createArticle";
import { Context } from "../../common/types/context";
import { UserService } from "../user/user.service";
import { UpdateArticle } from "./types/updateArticle";

@Resolver()
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly userService: UserService
  ) {
    this.articleService = new ArticleService(this.userService);
  }

  @Authorized()
  @Mutation(() => Article)
  async create(@Arg("input") input: CreateArticle, @Ctx() context: Context) {
    return this.articleService.create(input, String(context.user?.email));
  }

  @Authorized()
  @Mutation(() => Article)
  async update(
    @Arg("id") id: string,
    @Arg("input") input: UpdateArticle,
    @Ctx() context: Context
  ) {
    return await this.articleService.update(id, input, context.user);
  }

  @Authorized()
  @Mutation(() => String)
  async remove(@Arg("id") id: string, @Ctx() context: Context) {
    return await this.articleService.remove(id, context.user);
  }

  @Query(() => [Article])
  async findAll() {
    return await this.articleService.findAll();
  }

  @Query(() => Article)
  async find(@Arg("id") id: string) {
    return await this.articleService.find(id);
  }
}
