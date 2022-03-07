import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertTableTypeOffice1646605117722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO type_office(id,name) values ('ac555eb6-8768-467d-9d7f-ccd90b73a1a1', 'Diretor')," +
        "('345ec248-2b0b-405a-b61f-88cc675ee214', 'Gestor'), ('e60c3074-441a-4ced-b246-9815b10c07c7', 'Empregado')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE type_schooling');
  }
}
