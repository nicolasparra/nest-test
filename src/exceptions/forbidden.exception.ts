import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
  constructor(test: string) {
    super(`Forbidden ${test}`, HttpStatus.FORBIDDEN);
  }
}
