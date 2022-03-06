import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { TypeSchooling } from './TypeSchooling';
import { TypeUsers } from './TypeUsers';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  birth_date: string;

  @Column()
  uf_residence: string;

  @Column()
  city_residence: string;

  @Column()
  type_schooling_id: string;

  @Column()
  type_user_id: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => TypeUsers)
  @JoinColumn({ name: 'type_users_id' })
  typeUsers: TypeUsers;

  @ManyToOne(() => TypeSchooling)
  @JoinColumn({ name: 'type_schooling_id' })
  profession: TypeSchooling;
}

export { User };
