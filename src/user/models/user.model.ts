import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from 'src/post/models/post.model';

interface UserAttributes {
  user_id: number;
  user_name: string;
  user_info: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_name: string;

  @Column({
    type: DataType.STRING,
  })
  user_info: string;

  @HasMany(() => Post, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  posts: Post[];
}
