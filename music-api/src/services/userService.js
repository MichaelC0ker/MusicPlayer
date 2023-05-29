import sql from 'mssql';
import databasePool from '../data/index.js';

const pool = await databasePool;

export const retrieveUser = async (profileId) => {
  const sql_query = `SELECT id, username
                        FROM [User] 
                        WHERE username = @profile_id`;
  const result = await pool.request()
    .input('profile_id', sql.VarChar, profileId)
    .query(sql_query);

  return result.recordset;
};

export const addUser = async (username) => {
  const sql_query = `BEGIN
   IF NOT EXISTS (SELECT * FROM [User] 
                   WHERE username = @username)
   BEGIN
       INSERT INTO [User](username) VALUES (@username); 
       SELECT SCOPE_IDENTITY() AS id;
   END
END`;

  const result = pool.request()
    .input('username', sql.VarChar, username)
    .query(sql_query);

  return result?.recordset ?? {
    ok: false
  };
};
