import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./exceptions/http-exception.filter";
import { HeadersMiddleware } from "./middlewares/headers.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.use(HeadersMiddleware);
  await app.listen(AppModule.port);
}
bootstrap();
