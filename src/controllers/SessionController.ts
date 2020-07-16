import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import AppError from "../errors/AppError";

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const repo = getCustomRepository(UserRepository);

    const { username, password } = req.body;

    const user = await repo.findOne({ where: { username } });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    if (!(await user.checkPassword(password))) {
      throw new AppError("Invalid password", 401);
    }

    return res.json({ user, token: user.generateToken() });
  }
}

export default new SessionController();
