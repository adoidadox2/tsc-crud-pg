import { getRepository } from "typeorm";
import Post from "../models/Post";
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import CreatePostService from "../services/CreatePostService";

class PostController {
  async index(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(Post);

    const posts = await repo.find();

    return res.json(posts);
  }
  async store(req: Request, res: Response): Promise<Response> {
    const result = await CreatePostService.execute({
      userId: req.userId,
      body: req.body,
    });

    return res.json(result);
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
