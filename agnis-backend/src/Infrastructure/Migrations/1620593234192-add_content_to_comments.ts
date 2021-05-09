import { MigrationInterface, QueryRunner } from 'typeorm';

export class addContentToComments1620593234192 implements MigrationInterface {
  name = 'addContentToComments1620593234192';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comment"
        ADD "content" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comment"
        DROP COLUMN "content"`);
  }
}
