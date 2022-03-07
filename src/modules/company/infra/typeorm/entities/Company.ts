import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('companys')
class Company {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  occupation_area: string;

  @Column()
  description: string;

  @Column()
  name_director: string;

  @Column()
  founded_in: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;
}

export { Company };
