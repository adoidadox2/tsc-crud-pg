import { Router } from "express";

import handle from "express-async-handler";
import PostController from "../controllers/PostController";
import auth from "../middlewares/auth";

import { celebrate } from "celebrate";
import Post from "../validators/Post";

const postRouter = Router();

postRouter.use(auth);

postRouter.post("/", celebrate(Post), handle(PostController.store));
postRouter.get("/", handle(PostController.index));
postRouter.get("/:id", handle(PostController.show));
postRouter.put("/:id", handle(PostController.update));
postRouter.delete("/:id", handle(PostController.delete));

export default postRouter;
