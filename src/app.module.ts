import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { CatModule } from "./cats/cat.module";
import { CatsController } from "./cats/controllers/cats.controller";
import { Configuration } from "./config/config.keys";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { HeadersMiddleware } from "./middlewares/headers.middleware";
import { MongooseModule } from "@nestjs/mongoose";
import environments from "./environments";

@Module({
  controllers: [],
  providers: [],
  imports: [
    CatModule,
    ConfigModule,
    MongooseModule.forRoot(environments.DATABASE_URL),
  ],
})
export class AppModule implements NestModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(HeadersMiddleware).forRoutes("cats");
    consumer
      .apply(HeadersMiddleware)
      .forRoutes({ path: "cats", method: RequestMethod.GET });

    // consumer
    //   .apply(HeadersMiddleware)
    //   .exclude(
    //     { path: "cats", method: RequestMethod.GET },
    //     { path: "cats", method: RequestMethod.POST },
    //     "cats/(.*)"
    //   )
    //   .forRoutes(CatsController);

    // consumer.apply(cors(), helmet(), HeadersMiddleware).forRoutes(CatsController);
  }
}
