require('dotenv').config();
  const sql = require('mssql');

  const config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER,
      database: process.env.DB_DATABASE,
      options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
      },
    port: 1433 
    };
    
  const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
      console.log("connected to sql server");
      return pool;
    })
    .catch((err) => {
      console.log("Database connection failed", err);
      process.exit(1);
    });

  module.exports = poolPromise;