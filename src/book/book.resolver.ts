import { Inject } from '@nestjs/common';
import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import { BookInput, BookUpdateInput } from './inputs/book.input';
import {
  AddBookOutput,
  BookCursor,
  BookOutput,
  UODBookOutput,
} from './inputs/book.output';

@Resolver()
export class BookResolver {
  constructor(@Inject('BOOK_SERVICE') private client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('get.book');
    this.client.subscribeToResponseOf('get.books');
    this.client.subscribeToResponseOf('add.book');
    this.client.subscribeToResponseOf('update.book');
    this.client.subscribeToResponseOf('delete.book');
    await this.client.connect();
  }
  @Query(() => [BookOutput])
  book(@Args('id') id: number) {
    return this.client.send('get.book', { id });
  }

  @Query(() => BookCursor)
  books(
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
  ) {
    return this.client.send('get.books', { page, limit });
  }

  @Mutation(() => AddBookOutput)
  addBook(@Args('input') input: BookInput) {
    return this.client.send('add.book', input);
  }

  @Mutation(() => UODBookOutput)
  async updateBook(
    @Args('id') id: number,
    @Args('input') book: BookUpdateInput,
  ) {
    return this.client.send('update.book', { id, book });
  }

  @Mutation(() => UODBookOutput)
  async deleteBook(@Args('id') id: number) {
    return this.client.send('delete.book', { id });
  }
}
