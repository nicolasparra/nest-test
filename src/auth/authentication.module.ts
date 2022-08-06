import { Module } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import { UsersModule } from "../users/user.module";
import { AuthenticationController } from "./authentication.controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { ConfigService } from "../config/config.service";
import { Configuration } from "../config/config.keys";
import { ConfigModule } from "../config/config.module";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        ({
          secret: configService.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: `${configService.get(
              Configuration.JWT_EXPIRATION_TIME
            )}s`,
          },
        } as JwtModuleOptions),
    }),
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
