import { Injectable } from '@nestjs/common';
import { BookInput, BookUpdateInput } from './inputs/book.input';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  async getBook(id: number) {
    const book = await Book.find({
      relations: ['users'],
      where: { book_id: id },
    });
    return book[0];
  }

  async getBooks() {
    return await Book.find({ relations: ['users'] });
  }

  async addBook(newBook: BookInput): Promise<Book> {
    return await Book.create(newBook).save();
  }

  async updateBook(id: number, updateData: BookUpdateInput) {
    const book = await Book.findOne({ where: { book_id: id } });
    if (!book) {
      return { status: 404, msg: 'Book not found!' };
    } else {
      Object.assign(book, updateData);
      await book.save();
      return { status: 200, msg: 'Book updated!' };
    }
  }

  async deleteBook(id) {
    const book = await Book.find({
      where: { book_id: id },
    });
    if (book.length === 0) {
      return { status: 404, msg: 'Book not found!' };
    } else {
      await Book.delete({ book_id: id });
      return { status: 200, msg: 'Book deleted' };
    }
  }
}
