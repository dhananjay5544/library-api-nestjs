import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryController } from './library.controller';
import { Library } from './library.entity';
import { LibraryResolver } from './library.resolver';
import { LibraryService } from './library.service';

@Module({
  imports: [TypeOrmModule.forFeature([Library])],
  controllers: [LibraryController],
  providers: [LibraryService, LibraryResolver],
})
export class LibraryModule {}
