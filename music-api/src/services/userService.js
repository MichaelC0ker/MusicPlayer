import sql from 'mssql';
import databasePool from '../data/index.js';

const pool = await databasePool;

export const retrieveUser = async (profileId) => {
  const sqlQuery = `SELECT id, username
                        FROM [User] 
                        WHERE id = @profile_id`;
  const result = await pool.request()
    .input('profile_id', sql.VarChar, profileId)
    .query(sql_query);

  return result.recordset;
};

export const addUser = async (profile_id) => {
  const sql_query = `BEGIN
   IF NOT EXISTS (SELECT * FROM User 
                   WHERE id = @username)
   BEGIN
       INSERT INTO [User]('name') VALUES (@username); 
       SELECT SCOPE_IDENTITY() AS id;
   END
END`;

  const result = pool.request()
    .input('username', sql.VarChar, profile_id)
    .query(sql_query);

  return result?.recordset ?? {
    ok: false
  };
};
