import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Book } from './book.entity';
import { BookUpdateInput } from './inputs/book.input';

@Controller('book')
export class BookController {
  constructor(@Inject('BOOK_SERVICE') private client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('get.book');
    this.client.subscribeToResponseOf('get.books');
    this.client.subscribeToResponseOf('add.book');
    this.client.subscribeToResponseOf('update.book');
    this.client.subscribeToResponseOf('delete.book');
    await this.client.connect();
  }
  @Get(':id')
  getBook(@Param() param) {
    return this.client.send('get.book', param);
  }

  @Get()
  getBooks(@Query() query) {
    return this.client.send('get.books', query);
  }

  @Post()
  addBook(@Body() book: Book) {
    return this.client.send('add.book', book);
  }

  @Put(':id')
  updateBook(@Param() param, @Body() book: BookUpdateInput) {
    return this.client.send('update.book', { id: param.id, book });
  }

  @Delete(':id')
  deleteBook(@Param() param) {
    return this.client.send('delete.book', param);
  }
}
