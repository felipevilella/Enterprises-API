import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('type_office')
class TypeOffice {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}

export { TypeOffice };
