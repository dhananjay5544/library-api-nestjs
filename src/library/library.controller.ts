import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookIssueInput, BookReturnInput } from './inputs/library.input';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private libraryService: LibraryService) {}

  @Get()
  async bookHistory() {
    return await this.libraryService.historyRecord();
  }

  @Post('issue')
  async issueBook(@Body() data: BookIssueInput) {
    return await this.libraryService.issueBook(data);
  }

  @Post('return')
  async returnBook(@Body() data: BookReturnInput) {
    return await this.libraryService.returnBook(data);
  }
}
