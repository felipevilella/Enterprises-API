import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertTableUsersAdministrator1646417800771
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'INSERT INTO users(full_name,email, password, birth_date, uf_residence, city_residence, type_user_id) values' +
        "('administrador', 'administrador@enterprises.com.br', '$2b$08$MGwBxpkvQ1VaDsLX7zX/IOcszhR9JNEovujEInnaQ2CBgah0et/p.', '2022/03/04', 'MG', 'Belo Horizonte', 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE type_schooling');
  }
}
