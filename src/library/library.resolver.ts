import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import {
  ActionResponse,
  BookIssueInput,
  BookReturnInput,
  BooksIssueInput,
} from './inputs/library.input';
import { Library } from './library.entity';
import { LibraryService } from './library.service';

@Resolver()
export class LibraryResolver {
  constructor(private libraryService: LibraryService) {}

  // Mutation: issue book
  @Mutation(() => ActionResponse)
  async issueBook(@Args('options') options: BookIssueInput) {
    return await this.libraryService.issueBook(options);
  }

  // Mutation: issue multiple books
  @Mutation(() => ActionResponse)
  async issueBooks(@Args('options') options: BooksIssueInput) {
    return await this.libraryService.issueBooks(options);
  }

  // Mutation: return book
  @Mutation(() => ActionResponse)
  async returnBook(@Args('options') options: BookReturnInput) {
    return await this.libraryService.returnBook(options);
  }

  // Query: library books history
  @Query(() => [Library])
  async Library() {
    return await this.libraryService.historyRecord();
  }
}
