import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertTableTypeUsers1646417707759 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO type_users(id,name) values ('c1e1a7de-b446-45d2-bb5b-3d067a7705d2', 'Administrador')," +
        "('c1e1a7de-b446-45d2-bb5b-3d067a7705d5', 'Básico')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE type_users');
  }
}
