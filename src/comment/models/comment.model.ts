import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/post/models/post.model';

interface CommentAttributes {
  comment_id: number;
  comment_body: string;
  post_id: number;
}

@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, CommentAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  comment_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment_body: string;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
  })
  post_id: number;

  @BelongsTo(() => Post)
  post: Post;
}
