import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./exceptions/http-exception.filter";
import { HeadersMiddleware } from "./middlewares/headers.middleware";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix("api");
  // app.useGlobalPipes(
  //   new ValidationPipe({ whitelist: true, disableErrorMessages: true })
  // );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.use(HeadersMiddleware);
  await app.listen(AppModule.port);
}
bootstrap();
