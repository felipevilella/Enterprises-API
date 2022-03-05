import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableUsers1646417675093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'full_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'birth_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'uf_residence',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'city_residence',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type_schooling_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'type_user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'fk_users_type_schooling',
        columnNames: ['type_schooling_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'type_schooling',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'fk_users_type_user',
        columnNames: ['type_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'type_users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'type_user_id');
    await queryRunner.dropForeignKey('users', 'type_schooling');
    await queryRunner.dropTable('users');
  }
}
