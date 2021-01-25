import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ActionResponse {
  @Field(() => Int)
  status: number;

  @Field()
  msg: string;

  @Field({ nullable: true })
  reminder?: string;
}

@InputType()
export class BookIssueInput {
  @Field(() => Int)
  userid: number;

  @Field(() => Int)
  bookid: number;
}

@InputType()
export class BooksIssueInput {
  @Field(() => Int)
  userid: number;

  @Field(() => [Int])
  bookids: [number];
}

@InputType()
export class BookReturnInput {
  @Field(() => Int)
  userid: number;

  @Field(() => Int)
  bookid: number;
}
