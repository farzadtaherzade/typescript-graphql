import { AuthChecker } from "type-graphql";
import { Context } from "../types/context";

export const authChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles
) => {
  if (!context.user) {
    return false; // or 'false' if access is denied
  }
  return true;
};
