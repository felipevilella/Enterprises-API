import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableCollaborator1646603820916
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'collaborators',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'company_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'type_office_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
            default: true,
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
      'collaborators',
      new TableForeignKey({
        name: 'fk_user_collaborator',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'collaborators',
      new TableForeignKey({
        name: 'fk_type_office_collaborator',
        columnNames: ['type_office_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'type_office',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'collaborators',
      new TableForeignKey({
        name: 'fk_companny_type_collaborator',
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companys',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('collaborators', 'fk_user_collaborator');
    await queryRunner.dropForeignKey(
      'collaborators',
      'fk_type_office_collaborator',
    );
    await queryRunner.dropForeignKey(
      'collaborators',
      'fk_companny_type_collaborator',
    );
    await queryRunner.dropTable('collaborators');
  }
}
