import sql  from "mssql";
import databasePool from '../data/index.js'

const pool = await databasePool;

export const retrieveUser = async(username) => {
    let sql_query = `SELECT id, username
                        FROM [User] 
                        WHERE username = @username`;
    const result = await pool.request()
                    .input('username', sql.VarChar, username)
                    .query(sql_query);

    return result.recordset;
}

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
