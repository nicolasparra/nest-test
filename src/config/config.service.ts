require("dotenv").config();

export class ConfigService {
  private readonly envConfig: { [key: string]: string | number };

  constructor() {
    this.envConfig = {
      PORT: process.env.PORT || 3000,
      DB_HOST: process.env.DB_HOST || "localhost",
      DB_PORT: process.env.DB_PORT || 5435,
      DB_USER: process.env.DB_USER || "postgres",
      DB_PASS: process.env.DB_PASS || "12345678",
      DB_NAME: process.env.DB_NAME || "nest",
      JWT_EXPIRATION_TIME:
        process.env.JWT_EXPIRATION_TIME || "JWT_EXPIRATION_TIME",
      JWT_SECRET: process.env.JWT_SECRET || "JWT_SECRET",
    };
  }

  get(key: string): string | number {
    return this.envConfig[key];
  }
}
