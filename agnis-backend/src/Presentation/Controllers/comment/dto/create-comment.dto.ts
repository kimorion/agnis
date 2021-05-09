import { Evaluation } from '../../../../Infrastructure/Entities/Comment';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  post_id!: string;

  @IsNotEmpty()
  evaluation: Evaluation = Evaluation.Neutral;

  @IsNotEmpty()
  @IsString()
  content!: string;
}
