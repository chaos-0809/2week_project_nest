export default () => ({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT) || 3306,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  TYPEORM_SYNCHRONIZE: process.env.TYPEORM_SYNCHRONIZE,
});
