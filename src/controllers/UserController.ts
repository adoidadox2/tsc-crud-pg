import { getRepository, getCustomRepository } from "typeorm";
import User from "../models/User";
import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import AppError from "../errors/AppError";

class UserController {
  async index(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(User);

    const users = await repo.find();

    return res.json(users);
  }
  async store(req: Request, res: Response): Promise<Response> {
    const repo = getCustomRepository(UserRepository);

    const { name, username, password } = req.body;

    if (await repo.findOne({ where: { username } })) {
      throw new AppError("User already exists", 400);
    }

    const user = repo.createUser(name, username, password);

    await repo.save(user);

    delete user.password;

    return res.json(user);
  }
  async show(req: Request, res: Response): Promise<Response> {
    const repo = getCustomRepository(UserRepository);

    const id = req.params.id;

    const user = await repo.findOne({
      where: { id },
      relations: ["posts"],
    });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    const filteredPosts = user.posts.filter((post) => post.deleted_at === null);

    user.posts = filteredPosts;

    return res.json(user);
  }
  async update(req: Request, res: Response): Promise<Response> {
    const repo = getCustomRepository(UserRepository);

    const id = req.params.id;
    const { name, username, password } = req.body;

    const user = await repo.findOne({ where: { id } });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    if (user.id != req.userId) {
      throw new AppError("This account isn't yours", 401);
    }

    if (await repo.findOne({ where: { username } })) {
      throw new AppError("Username already exists", 400);
    }

    user.name = name;
    user.username = username;
    user.password = password;

    await repo.save(user);

    return res.json(user);
  }
  async delete(req: Request, res: Response): Promise<Response> {
    const userRepo = getCustomRepository(UserRepository);

    const id = req.params.id;

    const user = await userRepo.findOne({
      where: { id },
      relations: ["posts"],
    });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    if (user.id != req.userId) {
      throw new AppError("This account isn't yours", 401);
    }

    await userRepo.softRemove(user);

    return res.json();
  }
}

export default new UserController();
