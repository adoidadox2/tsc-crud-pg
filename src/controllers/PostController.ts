import { getRepository } from "typeorm";
import Post from "../models/Post";
import { Request, Response } from "express";

class PostController {
  async index(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(Post);
    const posts = await repo.find();

    return res.json(posts);
  }
  async store(req: Request, res: Response): Promise<Response> {
    return res.json();
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

export default new PostController();
