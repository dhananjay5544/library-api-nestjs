import { Field, InputType, Int } from '@nestjs/graphql';

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
