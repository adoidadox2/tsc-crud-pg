import { getRepository } from "typeorm";
import User from "../models/User";
import { Request, Response } from "express";

class UserController {
  async index(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(User);

    const users = await repo.find();

    return res.json(users);
  }
  async store(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(User);

    const user = repo.create(req.body);

    await repo.save(user);

    return res.json(user);
  }
  async show(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
  async update(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
  async delete(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
}

export default new UserController();
