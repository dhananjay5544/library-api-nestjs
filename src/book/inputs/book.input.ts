import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
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

@InputType()
export class AuthorInput {
  @Field()
  author_name: string;

  @Field()
  author_email: string;
}

@InputType()
export class AuthorUpdateInput {
  @Field(() => String, { nullable: true })
  author_name?: string;

  @Field(() => String, { nullable: true })
  author_email?: string;
}

@InputType()
export class BookInput {
  @Field()
  title: string;

  @Field(() => AuthorInput)
  author: AuthorInput;

  @Field(() => Int)
  quantity: number;
}

@InputType()
export class BookUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => AuthorUpdateInput, { nullable: true })
  author?: AuthorUpdateInput;

  @Field(() => Int, { nullable: true })
  quantity?: number;
}
