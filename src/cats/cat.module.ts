import { Module } from "@nestjs/common";
import { CatsController } from "./controllers/cats.controller";
import { CatsService } from "./services/cat.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Cat, CatSchema } from "./schemas/cat.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: Cat.name,
        useFactory: () => {
          const schema = CatSchema;
          schema.pre("save", function () {
            console.log("Hello from pre save");
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatModule {}
