import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { LibraryModule } from './library/library.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';

@Module({
  imports: [
    //ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'testuser',
      password: 'root123',
      database: 'library',
      synchronize: true,
      logging: false,
      entities: ['./dist/**/**.entity.js'],
    }),
    ScheduleModule.forRoot(),
    UserModule,
    BookModule,
    LibraryModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
