import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UserInput, UserUpdateInput } from './inputs/user.input';
import { UserCursor, UserOutput } from './inputs/user.output';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserOutput)
  async user(@Args('id') id: number) {
    return await this.userService.getUser(id);
  }

  @Query(() => UserCursor)
  async users(
    @Args('page', { nullable: true }) page: number,
    @Args('limit', { nullable: true }) limit: number,
  ) {
    return await this.userService.getUsers(page, limit);
  }

  @Mutation(() => User)
  async addUser(@Args('input') input: UserInput) {
    return await await this.userService.addUser(input);
  }

  @Mutation(() => String)
  async updateUser(
    @Args('id') id: number,
    @Args('input') input: UserUpdateInput,
  ) {
    return await (await this.userService.updateUser(id, input)).msg;
  }

  @Mutation(() => String)
  async deleteUser(@Args('id') id: number) {
    return await (await this.userService.deleteUser(id)).msg;
  }
}
