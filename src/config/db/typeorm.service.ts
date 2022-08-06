import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";
import Post from "../../posts/models/post.entity";
import User from "../../users/models/user.entity";
import { Configuration } from "../config.keys";
import { ConfigModule } from "../config.module";
import { ConfigService } from "../config.service";

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(configService: ConfigService) {
      return {
        ssl: false,
        type: "postgres" as "postgres",
        host: configService.get(Configuration.DB_HOST),
        username: configService.get(Configuration.DB_USER),
        password: configService.get(Configuration.DB_PASS),
        database: configService.get(Configuration.DB_NAME),
        // entities: [__dirname + "/../../**/**/**/*.entity.ts"],
        entities: [Post, User],
        synchronize: true, // never use TRUE in production!
        migrations: [__dirname + "/migrations/*{.ts,.js}"],
      } as DataSourceOptions;
    },
  }),
];

//  {
//       type: "postgres",
//       host: this.config.get("Configuration.DB_HOST").toString(),
//       port: parseInt(this.config.get("Configuration.DB_PORT").toString()),
//       database: this.config.get("Configuration.DB_NAME").toString(),
//       username: this.config.get("Configuration.DB_USER").toString(),
//       password: this.config.get("Configuration.DB_PASS") as "string",
//       // host: "localhost",
//       // port: 5435,
//       // database: "nest",
//       // username: "postgres",
//       // password: "12345678",
//       entities: [__dirname + "/../**/*.entity.ts"],
//       synchronize: true, // never use TRUE in production!
//     };
//   }
