import { MigrationInterface, QueryRunner } from "typeorm";

export class ThreadsMigration1699085532443 implements MigrationInterface {
    name = 'ThreadsMigration1699085532443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reply" DROP CONSTRAINT "FK_9b7de6888ce703f13e4bbfe13b7"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP CONSTRAINT "FK_e9886d6d04a19413a2f0aac5d7b"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_95627c64d9f57814010a003032e"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP COLUMN "threadId"`);
        await queryRunner.query(`ALTER TABLE "reply" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reply" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "reply" ADD "threadIdId" integer`);
        await queryRunner.query(`ALTER TABLE "reply" ADD CONSTRAINT "FK_9d6383dac426755e04fa743d83c" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reply" ADD CONSTRAINT "FK_4b38aca5bcd01deaa04efb76841" FOREIGN KEY ("threadIdId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_95627c64d9f57814010a003032e" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_95627c64d9f57814010a003032e"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP CONSTRAINT "FK_4b38aca5bcd01deaa04efb76841"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP CONSTRAINT "FK_9d6383dac426755e04fa743d83c"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP COLUMN "threadIdId"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "reply" ADD "threadId" integer`);
        await queryRunner.query(`ALTER TABLE "reply" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_95627c64d9f57814010a003032e" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reply" ADD CONSTRAINT "FK_e9886d6d04a19413a2f0aac5d7b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reply" ADD CONSTRAINT "FK_9b7de6888ce703f13e4bbfe13b7" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
