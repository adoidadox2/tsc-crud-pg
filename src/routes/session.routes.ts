import { Router } from "express";

import handle from "express-async-handler";
import SessionController from "../controllers/SessionController";

const sessionRouter = Router();

sessionRouter.post("/", handle(SessionController.store));

export default sessionRouter;
