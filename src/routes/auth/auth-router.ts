import { Router } from "express";
import { validators } from "../../middleware/validation";
import { authController } from "./auth-controller";
import { userDTO } from "./dto/user.dto";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/register", validators.bodyValidation(userDTO), authController.register);

export default authRouter;
