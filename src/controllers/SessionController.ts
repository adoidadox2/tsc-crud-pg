import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const repo = getCustomRepository(UserRepository);

    const { username, password } = req.body;

    const user = await repo.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.json({ user, token: user.generateToken() });
  }
}

export default new SessionController();
