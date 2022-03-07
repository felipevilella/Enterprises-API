import { User } from '@modules/accounts/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Company } from './Company';
import { TypeOffice } from './TypeOffice';

@Entity('collaborators')
class Collaborator {
  @PrimaryColumn()
  id: string;

  @Column()
  company_id: string;

  @Column()
  user_id: string;

  @Column()
  type_office_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => TypeOffice)
  @JoinColumn({ name: 'type_office_id' })
  typeOffice: TypeOffice;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column()
  active: boolean;
}

export { Collaborator };
