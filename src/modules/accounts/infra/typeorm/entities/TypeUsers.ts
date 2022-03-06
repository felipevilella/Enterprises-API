import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('type_users')
class TypeUsers {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;
}

export { TypeUsers };
