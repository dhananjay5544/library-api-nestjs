import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { BookUpdateInput } from './inputs/book.input';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get(':id')
  getBook(@Param() param) {
    return this.bookService.getBook(param.id);
  }

  @Get()
  getBooks() {
    return this.bookService.getBooks();
  }

  @Post()
  addBook(@Body() book: Book) {
    return this.bookService.addBook(book);
  }

  @Put(':id')
  updateBook(@Param() param, @Body() book: BookUpdateInput) {
    return this.bookService.updateBook(param.id, book);
  }

  @Delete(':id')
  deleteBook(@Param() param) {
    return this.bookService.deleteBook(param.id);
  }
}
