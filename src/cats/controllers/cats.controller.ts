import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  HttpCode,
  Header,
  Redirect,
  Res,
  HttpStatus,
  HttpException,
  UseFilters,
  ParseIntPipe,
  UseInterceptors,
} from "@nestjs/common";
import { CreateCatDto } from "../dto/create-cat.dto";
import { UpdateCatDto } from "../dto/update-cat.dto";
import { Request, Response } from "express";
import { CatsService } from "../services/cat.service";
import { ForbiddenException } from "../../exceptions/forbidden.exception";
import { HttpExceptionFilter } from "../../exceptions/http-exception.filter";
import { LoggingInterceptor } from "../interceptors/register.interceptor";
import { TransformInterceptor } from "../interceptors/transform.interceptor";

@Controller("cats")
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  findAll(@Query() query: string) {
    throw new HttpException("test param", HttpStatus.BAD_REQUEST);
    // throw new ForbiddenException("test param");
    return `This action returns all cats (limit: ${query} items)`;
  }

  @Get("all")
  @Header("Cache-Control", "none")
  @UseInterceptors(TransformInterceptor)
  findAllCats(@Req() request: Request): string {
    return "This action returns all cats";
  }

  @Get(":id")
  @HttpCode(200)
  findOne(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: string,
    // @Res({ passthrough: true }) res: Response
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json({ a: "aa" });
    return `This action returns a #${id} cat`;
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return `This action removes a #${id} cat`;
  }

  @Get("all")
  @Redirect("https://nestjs.com", 301)
  redirect(@Req() request: Request): { url: string } {
    return { url: "https://docs.nestjs.com/v5/" };
  }
}
