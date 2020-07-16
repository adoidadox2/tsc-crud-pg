import { getRepository } from "typeorm";
import Post from "../models/Post";
import { Request, Response } from "express";
import User from "../models/User";
import AppError from "../errors/AppError";

class PostController {
  async index(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(Post);

    const posts = await repo.find();

    return res.json(posts);
  }
  async store(req: Request, res: Response): Promise<Response> {
    const postRepo = getRepository(Post);
    const userRepo = getRepository(User);

    const { title, content } = req.body;

    if (await postRepo.findOne({ where: { title } })) {
      throw new AppError("Title already exists", 400);
    }

    const user = await userRepo.findOne({ where: { id: req.userId } });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    const post = postRepo.create({ title, content, user });

    await postRepo.save(post);

    return res.json(post);
  }
  async show(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(Post);

    const id = req.params.id;

    const post = await repo.findOne({ where: { id }, relations: ["user"] });

    if (!post) {
      throw new AppError("Post not found", 400);
    }

    return res.json(post);
  }
  async update(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(Post);

    const id = req.params.id;
    const { title, content } = req.body;

    const post = await repo.findOne({ where: { id }, relations: ["user"] });

    if (!post) {
      throw new AppError("Post not found", 400);
    }

    if (post.user.id != req.userId) {
      throw new AppError("This post isn't yours", 401);
    }

    if (await repo.findOne({ where: { title } })) {
      throw new AppError("Title already exists", 400);
    }

    post.title = title;
    post.content = content;

    await repo.save(post);

    return res.json(post);
  }
  async delete(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(Post);

    const id = req.params.id;

    const post = await repo.findOne({ where: { id }, relations: ["user"] });

    if (!post) {
      throw new AppError("Post not found", 400);
    }

    if (post.user.id != req.userId) {
      throw new AppError("This post isn't yours", 401);
    }

    await repo.softRemove(post);

    return res.json();
  }
}

export default new PostController();
