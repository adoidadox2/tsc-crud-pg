import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";

import bcrypt from "bcrypt";
@Entity("user")
export default class User {
  constructor(name: string, username: string, password: string) {
    this.name = name;
    this.username = username;
    this.password = password;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column()
  password_hash: string;

  password: string;

  @BeforeInsert()
  async upPass() {
    this.password_hash = await bcrypt.hash(this.password, 8);
    this.password = null;
  }
}
