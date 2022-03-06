import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('type_schooling')
class TypeSchooling {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;
}

export { TypeSchooling };
