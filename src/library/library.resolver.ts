import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import {
  ActionResponse,
  BookIssueInput,
  BookReturnInput,
} from './inputs/library.input';
import { Library } from './library.entity';
import { LibraryService } from './library.service';

@Resolver()
export class LibraryResolver {
  constructor(private libraryService: LibraryService) {}

  @Mutation(() => ActionResponse)
  async issueBook(@Args('options') options: BookIssueInput) {
    return await this.libraryService.issueBook(options);
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
