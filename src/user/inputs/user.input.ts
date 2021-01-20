import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/book/book.entity';

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

@InputType()
export class UserInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field(() => Int)
  age: number;
}

@InputType()
export class UserUpdateInput {
  @Field(() => String, { nullable: true })
  firstname?: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Int, { nullable: true })
  age?: number;
}
