import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Author } from '../author.entity';
import { User } from '../../user/user.entity';
import { Book } from '../book.entity';

@ObjectType()
export class BookOutput {
  @Field(() => Int)
  book_id: number;

  @Field()
  title: string;

  @Field(() => Author)
  author: Author;

  @Field(() => Int)
  quantity: number;

  @Field(() => [User], { nullable: true })
  users?: User;
}

@ObjectType()
export class BookCursor {
  @Field(() => Int, { nullable: true })
  page: number;

  @Field(() => Boolean)
  hasMore: boolean;

  @Field(() => Int)
  totalBooks: number;

  @Field(() => [BookOutput])
  books: BookOutput;
}

@ObjectType()
export class AddBookOutput {
  @Field()
  msg: string;

  @Field(() => Book)
  book?: Book;
}

@ObjectType()
export class UODBookOutput {
  @Field()
  msg: string;

  @Field(() => Int)
  status: number;
}
