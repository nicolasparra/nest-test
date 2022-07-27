import { Module } from "@nestjs/common";
import { databaseProviders } from "./typeorm.service";

@Module({
  imports: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
