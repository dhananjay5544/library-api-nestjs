import { MigrationInterface, QueryRunner } from 'typeorm';

export class database1612271315082 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('create schema if not exists `test-library`;');
    queryRunner.query('create schema if not exists `dev-library`;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('drop schema if exists `test-library`;');
    queryRunner.query('drop schema if exists `dev-library`;');
  }
}
