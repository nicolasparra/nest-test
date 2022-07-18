const environments = {
  DATABASE_URL: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === "test") {
  environments.DATABASE_URL = process.env.DATABASE_URL_TEST;
}

export default environments;
