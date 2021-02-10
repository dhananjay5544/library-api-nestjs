import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookResolver } from './book.resolver';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [BookResolver],
})
export class BookModule {}
