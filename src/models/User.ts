import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  BeforeUpdate,
} from "typeorm";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Post from "./Post";
import authConfig from "../config/auth";
@Entity("user")
export default class User {
  constructor(name: string, username: string, password: string) {
    this.name = name;
    this.username = username;
    this.password = password;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password_hash: string;

  password: string | null;

  @OneToMany((type) => Post, (post) => post.user, {
    cascade: ["update", "remove", "soft-remove"],
  })
  posts: Post[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeUpdate()
  @BeforeInsert()
  async upPass() {
    this.password_hash = await bcrypt.hash(this.password, 8);
    this.password = null;
  }

  checkPassword(password: String) {
    return bcrypt.compare(password, this.password_hash);
  }

  generateToken() {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: authConfig.ttl,
    });
  }
}
