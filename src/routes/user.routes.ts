import { Router } from "express";
import handle from "express-async-handler";
import UserController from "../controllers/UserController";

const userRouter = Router();

userRouter.post("/", handle(UserController.store));

userRouter.get("/", handle(UserController.index));
userRouter.get("/:id", handle(UserController.show));
userRouter.put("/:id", handle(UserController.update));
userRouter.delete("/:id", handle(UserController.delete));

export default userRouter;
