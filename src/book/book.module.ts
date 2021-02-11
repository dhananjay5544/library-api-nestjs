import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
//import { clientOptions } from 'src/config/kafkaClient';
import { BookController } from './book.controller';
import { BookResolver } from './book.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOK_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'book',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'book-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookResolver],
})
export class BookModule {}
