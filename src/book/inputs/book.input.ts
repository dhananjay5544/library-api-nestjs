import { User } from '../../user/user.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookOutput {
  @Field(() => Int)
  book_id: number;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => [User])
  users?: User;
}

@InputType()
export class BookInput {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field(() => Int)
  quantity: number;
}

@InputType()
export class BookUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  author?: string;

  @Field(() => Int, { nullable: true })
  quantity?: number;
}
