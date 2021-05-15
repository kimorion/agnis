import {MigrationInterface, QueryRunner} from "typeorm";

export class addLoginToUser1621095462298 implements MigrationInterface {
    name = 'addLoginToUser1621095462298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "login" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_a62473490b3e4578fd683235c5e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "login"`);
    }

}
