import { Router } from "express";

import Brute from "express-brute";
import BruteRedis from "express-brute-redis";

import handle from "express-async-handler";
import SessionController from "../controllers/SessionController";

import { celebrate } from "celebrate";
import Session from "../validators/Session";

const sessionRouter = Router();

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
const bruteForce = new Brute(bruteStore);

sessionRouter.post(
  "/",
  bruteForce.prevent,
  celebrate(Session),
  handle(SessionController.store)
);

export default sessionRouter;
