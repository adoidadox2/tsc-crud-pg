import { Router } from "express";

import handle from "express-async-handler";
import SessionController from "../controllers/SessionController";

import { celebrate } from "celebrate";
import Session from "../validators/Session";

const sessionRouter = Router();

sessionRouter.post("/", celebrate(Session), handle(SessionController.store));

export default sessionRouter;
