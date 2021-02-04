import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from '../../book/book.entity';
import { User } from '../user.entity';

@ObjectType()
export class UserOutput {
  @Field(() => Int)
  user_id: number;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field(() => Int)
  age: number;

  @Field(() => [Book])
  books?: Book;
}

@ObjectType()
export class UserCursor {
  @Field(() => Int, { nullable: true })
  page: number;

  @Field(() => Boolean)
  hasMore: boolean;

  @Field(() => Int)
  totalUsers: number;

  @Field(() => [UserOutput])
  users: UserOutput;
}

@ObjectType()
export class AuthResponse {
  @Field(() => Int)
  status: number;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => String)
  msg: string;
}

@ObjectType()
export class AddUserResponse {
  @Field(() => Int)
  status: number;

  @Field(() => String)
  msg: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
