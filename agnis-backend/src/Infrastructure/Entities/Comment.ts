import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  userId!: string;

  @Column('uuid')
  postId!: string;

  @Column('varchar', { length: 20 })
  evaluation!: Evaluation;
}

enum Evaluation {
  Negative,
  Neutral,
  Positive,
}
