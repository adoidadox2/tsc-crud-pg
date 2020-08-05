import { getRepository } from "typeorm";
import Post from "../models/Post";
import User from "../models/User";
import AppError from "../errors/AppError";
import CreatePostDTO from "../dtos/CreatePostDTO";

class CreateUserService {
  async execute({
    userId,
    body: { title, content },
  }: CreatePostDTO): Promise<Post> {
    const postRepo = getRepository(Post);
    const userRepo = getRepository(User);

    if (await postRepo.findOne({ where: { title } })) {
      throw new AppError("Title already exists", 400);
    }

    const user = await userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    const post = postRepo.create({ title, content, user });

    const createdPost = await postRepo.save(post);

    return createdPost;
  }
}

export default new CreateUserService();
