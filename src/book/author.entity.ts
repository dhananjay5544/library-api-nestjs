import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Author extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  author_id: number;

  @Field()
  @Column()
  author_name: string;

  @Field()
  @Column()
  author_email: string;
}
