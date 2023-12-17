import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Comment } from 'src/comment/models/comment.model';
import { User } from 'src/user/models/user.model';

interface PostAttributes {
  post_id: number;
  post_body: string;
  user_id: number;
}

@Table({ tableName: 'post' })
export class Post extends Model<Post, PostAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  post_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  post_body: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  comments: Comment[];
}
