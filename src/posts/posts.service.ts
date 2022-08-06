import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import Post from "./models/post.entity";
import CreatePostDto from "./dto/createPost.dto";
import IPost from "./post.interface";
import UpdatePostDto from "./dto/updatePost.dto";
import { PostRepository } from "./repositories/post.repository";

@Injectable()
export default class PostsService {
  constructor(private postRepository: PostRepository) {}
  private lastPostId = 0;
  private posts: Post[] = [];

  getAllPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (post) {
      return post;
    }
    throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
  }

  async replacePost(id: number, post: UpdatePostDto) {
    await this.postRepository.update(id, post);
    const updatedPost = await this.postRepository.findOne({ where: { id } });
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.postRepository.create(post);
    await this.postRepository.save(newPost);
    return newPost;
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }
  }
}
