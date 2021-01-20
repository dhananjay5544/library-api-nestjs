import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserUpdateInput } from './inputs/user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param() param) {
    return this.userService.getUser(param.id);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  addUser(@Body() user: User) {
    return this.userService.addUser(user);
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
