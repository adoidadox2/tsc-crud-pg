import "reflect-metadata";
import "dotenv/config";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import routes from "./routes";
import cors from "cors";
import "./database";
import { errors } from "celebrate";
import AppError from "./errors/AppError";
class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exception();
  }
  middlewares() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
  exception() {
    this.server.use(errors());
    this.server.use(
      async (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof AppError) {
          return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
          });
        }

        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    );
  }
}

export default new App().server;
