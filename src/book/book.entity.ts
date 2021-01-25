import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.entity';
import { Author } from './author.entity';

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  book_id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => Int)
  @Column('int')
  quantity: number;

  @Field()
  @OneToOne(() => Author, { cascade: true })
  @JoinColumn()
  author: Author;

  @ManyToMany(() => User, (user: User) => user.books)
  users: User[];
}
