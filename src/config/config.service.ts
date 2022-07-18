require("dotenv").config();

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    this.envConfig = {
      PORT: process.env.PORT,
    };
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
