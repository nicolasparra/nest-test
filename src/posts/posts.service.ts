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

  getAllPosts() {
    return this.postRepository.find();
  }

  getPostById(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (post) {
      return post;
    }
    throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
  }

  replacePost(id: number, post: UpdatePostDto) {
    // const postIndex = this.posts.findIndex((post) => post.id === id);
    // if (postIndex > -1) {
    //   this.posts[postIndex] = post;
    //   return post;
    // }
    throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
  }

  createPost(post: CreatePostDto) {
    const newPost = {
      id: ++this.lastPostId,
      ...post,
    };
    // this.posts.push(newPost);
    return newPost;
  }

  deletePost(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
      this.posts.splice(postIndex, 1);
    } else {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }
  }
}
