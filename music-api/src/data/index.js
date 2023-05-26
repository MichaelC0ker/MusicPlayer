
import * as dotenv from 'dotenv';
import sql from 'mssql';
dotenv.config();

const config = {
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  options: {
    trustServerCertificate: process.env.SQL_TRUST_SERVER === 'true'
  }
};

const databasePool = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    return pool;
  })
  .catch((err) => console.log('Database connection failed: ', err));

export default databasePool;
