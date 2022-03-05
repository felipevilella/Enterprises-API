import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertTableTypeSchooling1646417734549
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO type_schooling(id,name) values ('c1e1a7de-b446-45d2-bb5b-3d067a7705e2', 'Infantil')," +
        "('c1e1a7de-b446-45d2-bb5b-3d067a7705e3', 'Fundamental'), ('c1e1a7de-b446-45d2-bb5b-3d067a7705e4', 'Médio')," +
        "('c1e1a7de-b446-45d2-bb5b-3d067a7705e5', 'Superior'), ('c1e1a7de-b446-45d2-bb5b-3d067a7705e6', 'Pós-graduação')," +
        "('c1e1a7de-b446-45d2-bb5b-3d067a7705e7', 'Mestrado'), ('c1e1a7de-b446-45d2-bb5b-3d067a7705e8', 'Doutorado')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE type_schooling');
  }
}
