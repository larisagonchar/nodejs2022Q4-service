import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  VersionColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  login: string;

  @Column({ type: 'varchar' })
  password: string;

  @VersionColumn({ type: 'int' })
  version: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return {
      id,
      login,
      version,
      createdAt: +new Date(createdAt),
      updatedAt: +new Date(updatedAt),
    };
  }
}
