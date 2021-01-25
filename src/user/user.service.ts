import { Injectable } from '@nestjs/common';
import { Library } from '../library/library.entity';
import { UserInput, UserUpdateInput } from './inputs/user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async getUser(id: number) {
    const user = await User.find({
      relations: ['books'],
      where: { user_id: id },
    });
    return user[0];
  }

  async getUsers() {
    return await User.find({ relations: ['books'] });
  }

  async addUser(user: UserInput): Promise<User> {
    return await User.create(user).save();
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
