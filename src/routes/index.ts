import { Router } from "express";
import userRouter from "./user.routes";
import postRouter from "./post.routes";

const routes = Router();

routes.get("/", (req, res) => {
  return res.send("Hello world");
});

routes.use("/users", userRouter);
routes.use("/posts", postRouter);

export default routes;
