import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import Post from "../models/post.entity";

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private _dataSource: DataSource) {
    super(Post, _dataSource.createEntityManager());
  }

  /**
   * Add a basic where clause to the query and return the first result.
   */
  async firstWhere(
    column: string,
    value: string | number,
    operator = "="
  ): Promise<Post | undefined> {
    return this.createQueryBuilder()
      .where(`Posts.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
