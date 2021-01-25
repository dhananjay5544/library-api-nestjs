import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { BookInput, BookOutput, BookUpdateInput } from './inputs/book.input';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Resolver()
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query(() => [BookOutput])
  async book(@Args('id') id: number) {
    return await this.bookService.getBook(id);
  }

  @Query(() => [BookOutput])
  async books() {
    return await this.bookService.getBooks();
  }

  @Mutation(() => Book)
  async addBook(@Args('input') input: BookInput) {
    return await await this.bookService.addBook(input);
  }

  @Mutation(() => String)
  async updateBook(
    @Args('id') id: number,
    @Args('input') input: BookUpdateInput,
  ) {
    return await (await this.bookService.updateBook(id, input)).msg;
  }

  @Mutation(() => String)
  async deleteBook(@Args('id') id: number) {
    return await (await this.bookService.deleteBook(id)).msg;
  }
}
