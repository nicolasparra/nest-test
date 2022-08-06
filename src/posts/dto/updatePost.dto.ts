import { IsNotEmpty } from "class-validator";

export default class UpdatePostDto {
  id: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  title: string;
}
