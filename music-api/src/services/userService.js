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

export const addUser = async(newUser) => {    
    let sql_query = `INSERT INTO [User](name) VALUES (@username)`;
   
    const result = await pool.request()
                    .input('username', sql.VarChar, newUser)
                    .query(sql_query);

    return result.recordset;
}