import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserUpdateInput, LoginInput } from './inputs/user.input';
import { User } from './user.entity';
import { UserService } from './user.service';
import * as cacheManager from 'cache-manager';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  manager = cacheManager.caching({ store: 'memory', ttl: 10, max: 100 });
  @Get(':id')
  async getUser(@Param() param) {
    const cached = await this.manager.get(`user${param.id}`);
    if (cached) {
      return cached;
    }
    this.manager.set(
      `user${param.id}`,
      await this.userService.getUser(param.id),
    );
    return await this.manager.get(`user${param.id}`);
  }

  @Get()
  async getUsers(@Query() query) {
    const cached = await this.manager.get(`users${query.page}-${query.limit}`);
    if (cached) {
      return cached;
    }
    this.manager.set(
      `users${query.page}-${query.limit}`,
      await this.userService.getUsers(query.page, query.limit),
    );
    return await this.manager.get(`users${query.page}-${query.limit}`);
  }

  @Post()
  addUser(@Body() user: User) {
    return this.userService.addUser(user);
  }

  @Post('auth')
  login(@Body() data: LoginInput) {
    return this.userService.userLogin(data.email, data.password);
  }

  @Put(':id')
  updateUser(@Param() param, @Body() user: UserUpdateInput) {
    return this.userService.updateUser(param.id, user);
  }

  @Delete(':id')
  deleteUser(@Param() param) {
    return this.userService.deleteUser(param.id);
  }
}
