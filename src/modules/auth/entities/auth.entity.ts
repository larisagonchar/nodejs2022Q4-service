import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  login: string;

  @Column({ type: 'varchar' })
  password: string;
}
