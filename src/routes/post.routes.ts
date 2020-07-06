import { Router } from "express";

import handle from "express-async-handler";
import PostController from "../controllers/PostController";
import auth from "../middlewares/auth";

const postRouter = Router();

postRouter.use(auth);

postRouter.post("/", handle(PostController.store));
postRouter.get("/", handle(PostController.index));
postRouter.get("/:id", handle(PostController.show));
postRouter.put("/:id", handle(PostController.update));
postRouter.delete("/:id", handle(PostController.delete));

export default postRouter;
