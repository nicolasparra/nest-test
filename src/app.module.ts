import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { Configuration } from "./config/config.keys";
import { ConfigService } from "./config/config.service";
import { HeadersMiddleware } from "./middlewares/headers.middleware";
// import { MongooseModule } from "@nestjs/mongoose";
import { HealthController } from "./health/health.controller";
import environments from "./environments";
import { PostsModule } from "./posts/posts.module";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./config/db/database.module";

@Module({
  controllers: [HealthController],
  providers: [],
  imports: [ConfigModule, DatabaseModule, PostsModule],
})
export class AppModule implements NestModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HeadersMiddleware)
      .forRoutes({ path: "cats", method: RequestMethod.GET });
  }
}
