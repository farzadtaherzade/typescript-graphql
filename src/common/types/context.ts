import { Request, Response } from "express";
import { User } from "../../modules/user/user.schema";

export interface Context {
  req: Request<{
    authorization: string;
  }>;
  res: Response;
  user: User | null;
}
