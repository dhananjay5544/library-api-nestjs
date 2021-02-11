import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { clientOptions } from 'src/config/kafkaClient';
import { BookController } from './book.controller';
import { BookResolver } from './book.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOK_SERVICE',
        transport: Transport.KAFKA,
        options: clientOptions,
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookResolver],
})
export class BookModule {}
