import { Article, ArticleModel } from "./article.schema";
import { CreateArticle } from "./types/createArticle";
import { UserService } from "../user/user.service";
import { ApolloError } from "apollo-server";
import { UpdateArticle } from "./types/updateArticle";
import { User } from "../user/user.schema";

export class ArticleService {
  constructor(private readonly userService: UserService) {
    this.userService = new UserService();
  }

  async findAll() {
    const articles = await ArticleModel.find({}).populate("owner");
    return articles;
  }

  async find(id: string) {
    const article = await this.findArticleById(id);
    if (!article) throw new ApolloError(`Article not found with Id: ${id}`);
    return article;
  }

  async create(createArticleInput: CreateArticle, email: string) {
    const user = await this.userService.findUserByEmail(email);
    createArticleInput.owner = user?._id;
    const article = await ArticleModel.create(createArticleInput);
    return article;
  }

  async findArticleById(id: string): Promise<Article> {
    const article = await ArticleModel.findById(id).populate("owner");
    if (!article) throw new ApolloError(`Article not found with Id: ${id}`);

    return article;
  }

  async update(id: string, input: UpdateArticle, user: User) {
    const article = await this.findArticleById(id);
    if (article.owner == user._id)
      throw new ApolloError(
        `you are not authorized to update this article as it does not belong to you.`
      );
    const updateResult = await ArticleModel.updateOne(
      { _id: article._id },
      { $set: input }
    );
    if (updateResult.modifiedCount == 0)
      throw new ApolloError("Update operation failed.");
    const updateArticle = await ArticleModel.findById(article._id).populate(
      "owner"
    );
    return updateArticle;
  }

  async remove(id: string, user: User) {
    const article = await this.findArticleById(id);
    if (user._id.toString() !== article.owner._id.toString())
      throw new ApolloError(
        `you are not authorized to update this article as it does not belong to you.`
      );
    const updateResult = await ArticleModel.deleteOne({ _id: article._id });
    if (updateResult.deletedCount == 0)
      throw new ApolloError("Update operation failed.");
    return "article deleted successfully";
  }
}
