import "reflect-metadata";
import "dotenv/config";
import express from "express";
import routes from "./routes";
import cors from "cors";
import "./database";
class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exception();
  }
  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }
  routes() {
    this.server.use(routes);
  }
  exception() {}
}

export default new App().server;
