import { User } from "../models/user-model";
import { Express } from "express";

declare global {
  namespace Express {
    /**
     * Overrides Express.Request.
     * Adds some new properties.
     */
    interface Request {
      // the authenticated user
      user?: User;
    }
  }
}
