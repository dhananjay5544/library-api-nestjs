import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Library } from '../library/library.entity';
import { UserInput, UserUpdateInput } from './inputs/user.input';
import { AddUserResponse, AuthResponse } from './inputs/user.output';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private authService: AuthService) {}

  async userLogin(email: string, password: string): Promise<AuthResponse> {
    const user = await User.createQueryBuilder('row')
      .addSelect('row.password')
      .where('email = :email', { email })
      .getOne();
    if (!user) {
      return {
        status: 404,
        msg: 'User not registered',
      };
    }
    const res = await this.authService.comparePassword(password, user.password);
    if (res) {
      return {
        status: 200,
        token: await this.authService.generateJWT(user),
        msg: 'login successful',
      };
    }
    return {
      status: 401,
      msg: 'Invalid password',
    };
  }

  async getUser(id: number) {
    const user = await User.find({
      where: { user_id: id },
    });
    if (user.length === 0) {
      return { status: 404, msg: 'User not found' };
    }
    return { status: 200, msg: 'User found!', user: user[0] };
  }

  async getUsers(page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const count = await User.count();
    const response = {
      page,
      hasMore: endIndex < count,
      totalUsers: count,
      users: await User.find({ take: limit, skip: startIndex }),
    };
    return response;
  }

  async addUser(user: UserInput): Promise<AddUserResponse> {
    const userExists = await User.findOne({ email: user.email });
    if (userExists) {
      return {
        status: 400,
        msg: 'user already registered',
      };
    } else {
      user.password = await this.authService.hashPassword(user.password);
      return {
        status: 200,
        msg: 'user registered successfully',
        user: await User.create(user).save(),
      };
    }
  }

  async updateUser(id: number, updateData: UserUpdateInput) {
    const user = await User.findOne({ where: { user_id: id } });

    if (!user) {
      return { status: 404, msg: 'user not found!' };
    } else {
      Object.assign(user, updateData);
      await user.save();
      return { status: 200, msg: 'user updated!' };
    }
  }

  async deleteUser(id) {
    const user = await User.find({
      where: { user_id: id },
    });
    const bookIssued = await Library.find({
      where: { userid: id, status: 'issued' },
    });
    if (user.length === 0) {
      return { status: 404, msg: 'user not found!' };
    } else if (bookIssued.length !== 0) {
      return { status: 201, msg: 'operation not allowed' };
    } else {
      await User.delete({ user_id: id });
      return { status: 200, msg: 'user deleted' };
    }
  }
}
