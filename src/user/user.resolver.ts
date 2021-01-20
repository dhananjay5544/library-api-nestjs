import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UserInput, UserOutput, UserUpdateInput } from './inputs/user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserOutput)
  async user(@Args('id') id: number) {
    return await this.userService.getUser(id);
  }

  @Query(() => [UserOutput])
  async users() {
    return await this.userService.getUsers();
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
