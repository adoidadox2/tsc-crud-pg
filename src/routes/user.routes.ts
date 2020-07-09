import { Router } from "express";
import handle from "express-async-handler";
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";

import { celebrate } from "celebrate";
import User from "../validators/User";

const userRouter = Router();

userRouter.post("/", celebrate(User), handle(UserController.store));

userRouter.use(auth);

userRouter.get("/", handle(UserController.index));
userRouter.get("/:id", handle(UserController.show));
userRouter.put("/:id", handle(UserController.update));
userRouter.delete("/:id", handle(UserController.delete));

export default userRouter;
