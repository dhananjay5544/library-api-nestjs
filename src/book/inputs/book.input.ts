import { Field, InputType, Int } from '@nestjs/graphql';

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
