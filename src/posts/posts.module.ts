import { Module } from "@nestjs/common";
import PostsController from "./posts.controller";
import PostsService from "./posts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Post from "./models/post.entity";
import { PostRepository } from "./repositories/post.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  exports: [PostsService],
  controllers: [PostsController],
  providers: [PostRepository, PostsService],
})
export class PostsModule {}
