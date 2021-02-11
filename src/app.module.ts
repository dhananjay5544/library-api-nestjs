import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { LibraryModule } from './library/library.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
//import { TYPEORM } from './environments';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      host: 'emtec',
      port: 3306,
      username: 'testuser',
      password: 'root123',
      database: 'library',
      type: 'mysql',
      synchronize: true,
      logging: false,
      entities: ['./dist/**/**.entity.js'],
    }),
    ScheduleModule.forRoot(),
    UserModule,
    BookModule,
    LibraryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
