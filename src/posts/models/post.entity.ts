import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Column({ type: "varchar", length: 25, nullable: false })
  public title: string;

  @Column({ type: "varchar", length: 25, nullable: false })
  public content: string;

  @Column({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
  })
  createdAt: Date;

  @Column({
    type: "timestamp",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
  })
  updateAt: Date;
}
