import { Query, Resolver } from "type-graphql";

@Resolver()
export class HomeResolver {
  @Query(() => String)
  home() {
    return "Hello World";
  }
}
