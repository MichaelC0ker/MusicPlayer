import databasePool from '../data/index.js'
import sql from 'mssql';

const pool = await databasePool;

export const addUser = async (profile_id) => {
  const sql_query = `BEGIN
   IF NOT EXISTS (SELECT * FROM User 
                   WHERE id = @username)
   BEGIN
       INSERT INTO [User]('name') VALUES (@username); 
       SELECT SCOPE_IDENTITY() AS id;
   END
END`;

  const request = pool.request()
    .input('username', sql.VarChar, profile_id)
    .query(sql_query);

  return result.recordset;
};
