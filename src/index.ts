import { authChecker } from "./common/guard/jwt.guard";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express, { Express } from "express";
import { buildSchema } from "type-graphql";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { HomeResolver } from "./modules/home/home.resolver";
import { UserResolver } from "./modules/user/user.resolver";
import { connectToMongoDB } from "./config/mongoose.config";
import { AuthResolver } from "./modules/auth/auth.resolver";
import { Context } from "./common/types/context";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "./modules/user/user.schema";
import { ArticleResolver } from "./modules/article/article.resolver";

dotenv.config({});

const bootstrap = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HomeResolver, UserResolver, AuthResolver, ArticleResolver],
      authChecker,
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: async (context: Context) => {
      if (context.req?.headers?.authorization) {
        const { id }: any = verify(
          context.req?.headers?.authorization,
          process.env.SECRET_KEY || "secret"
        );
        context.user = await UserModel.findById(id);
      }
      return context;
    },
  });
  await apolloServer.start();
  const app: Express = express();

  apolloServer.applyMiddleware({ app });

  await connectToMongoDB(process.env.DB_URL || "");

  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

bootstrap().catch((err) => console.error(err));
