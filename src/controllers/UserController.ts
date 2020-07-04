import { getRepository, getCustomRepository } from "typeorm";
import User from "../models/User";
import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";

class UserController {
  async index(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(User);

    const users = await repo.find();

    return res.json(users);
  }
  async store(req: Request, res: Response): Promise<Response> {
    const repo = getCustomRepository(UserRepository);

    const { name, username, password } = req.body;

    const user = repo.createUser(name, username, password);

    await repo.save(user);

    delete user.password;

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
