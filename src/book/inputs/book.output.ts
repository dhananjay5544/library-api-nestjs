import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Author } from '../author.entity';
import { User } from '../../user/user.entity';

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

  @Field(() => [BookOutput])
  books: BookOutput;
}
