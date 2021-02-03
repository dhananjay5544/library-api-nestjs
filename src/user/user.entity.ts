import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from '../book/book.entity';
import { Library } from '../library/library.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  user_id: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ select: false })
  password: string;

  @Field(() => Int)
  @Column('int')
  age: number;

  @ManyToMany(() => Book, (book: Book) => book.users, { eager: true })
  @JoinTable()
  books: Book[];

  @OneToMany(() => Library, (library) => library.userid, {
    onDelete: 'CASCADE',
  })
  userinfo: Library;
}
