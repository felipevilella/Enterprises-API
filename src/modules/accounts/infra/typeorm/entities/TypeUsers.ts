import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('type_users')
class TypeUsers {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}

export { TypeUsers };
