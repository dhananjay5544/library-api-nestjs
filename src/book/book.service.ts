import { Injectable } from '@nestjs/common';
import { BookInput, BookUpdateInput } from './inputs/book.input';
import { Book } from './book.entity';
import { Author } from './author.entity';

@Injectable()
export class BookService {
  async getBook(id: number) {
    const book = await Book.find({
      relations: ['users'],
      where: { book_id: id },
    });
    return book;
  }

  async getBooks(page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const count = await Book.count();
    const response = {
      page,
      hasMore: endIndex < count,
      totalBooks: count,
      books: await Book.find({
        take: limit,
        skip: startIndex,
        relations: ['users'],
      }),
    };
    return response;
  }

  async addBook(newBook: BookInput): Promise<Book> {
    const author = await Author.create(newBook.author).save();
    const book = await Book.create({
      title: newBook.title,
      quantity: newBook.quantity,
      author,
    }).save();
    return book;
  }

  async updateBook(id: number, updateData: BookUpdateInput) {
    var book = await Book.findOne({
      where: { book_id: id },
    });

    if (!book) {
      return { status: 404, msg: 'Book not found!' };
    } else {
      if (updateData.title) {
        book.title = updateData.title;
      }
      if (updateData.quantity) {
        book.quantity = updateData.quantity;
      }
      if (updateData.author.author_name) {
        book.author.author_name = updateData.author.author_name;
      }
      if (updateData.author.author_email) {
        book.author.author_email = updateData.author.author_email;
      }
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
