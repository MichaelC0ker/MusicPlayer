import sql  from "mssql";
import databasePool from '../data/index.js'

const pool = await databasePool;

export const retrieveGenreByName = async(genre) => {
    let sql_query = `SELECT id, name
                        FROM [Genre] 
                        WHERE name = @genre`;
    const result = await pool.request()
                    .input('genre', sql.VarChar, genre)
                    .query(sql_query);

    return result.recordset;
}

export const addGenre = async(genre) => {
    // change logic
    const values = [genre];
    
    let sql_query = `INSERT INTO [Genre](name) VALUES (${values.map((_,i) => `@param_${i}`)}); 
                    SELECT SCOPE_IDENTITY() AS id;`;
   
    const request = pool.request();
    for (let i = 0; i < values.length; i++)
        request.input(`param_${i}`, values[i]);
    const result = await request
                    // .input('name', sql.VarChar, genre)
                    .query(sql_query);
    return result.recordset;
}
