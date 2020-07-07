import { getRepository } from "typeorm";
import Post from "../models/Post";
import { Request, Response } from "express";
import User from "../models/User";

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
      return res.status(400).json({ error: "Title already exists" });
    }

    const user = await userRepo.findOne({ where: { id: req.userId } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const post = postRepo.create({ title, content, user });

    await postRepo.save(post);

    return res.json(post);
  }
  async show(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(Post);

    const id = req.params.id;

    const post = await repo.findOne({ where: { id } });

    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }

    return res.json(post);
  }
  async update(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(Post);

    const id = req.params.id;
    const { title, content } = req.body;

    const post = await repo.findOne({ where: { id } });

    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }

    // if (post.user.id != req.userId) {
    //   return res.status(401).json({ error: "This account isn't yours" });
    // }

    if (await repo.findOne({ where: { title } })) {
      return res.status(400).json({ error: "Title already exists" });
    }

    post.title = title;
    post.content = content;

    await repo.save(post);

    return res.json(post);
  }
  async delete(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(Post);

    const id = req.params.id;

    const post = await repo.findOne({ where: { id } });

    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }

    // if (post.user.id != req.userId) {
    //   return res.status(401).json({ error: "This account isn't yours" });
    // }

    await repo.softRemove(post);

    return res.json();
  }
}

export default new PostController();
