import sql  from "mssql";
import databasePool from '../data/index.js'

const pool = await databasePool;

export const retrieveAlbum = async(albumId) => {
    let sql_query = `SELECT id, title, release_year
                        FROM [Album] 
                        WHERE id = @album`;

    const result = await pool.request()
                    .input('album', sql.Int, albumId)
                    .query(sql_query);

    return result.recordset;
}
export const retrieveAlbumByName = async(albumName) => {
    let sql_query = `SELECT id, title, release_year
                        FROM [Album] 
                        WHERE title = @title`;

    const result = await pool.request()
                    .input('title', sql.VarChar, albumName)
                    .query(sql_query);

    return result.recordset;
}

export const addAlbum = async(albumDetails) => {
    const columns = Object.keys(albumDetails);
    console.log(columns);
    const values = Object.values(albumDetails);
    
    let sql_query = `INSERT INTO [Album](${columns}) VALUES (${values.map((_,i) => `@param_${i}`)});
                    SELECT SCOPE_IDENTITY() AS id;`;
    
    const request = pool.request();
    for (let i = 0; i < values.length; i++)
        request.input(`param_${i}`, values[i]);
    const result = await request
                    .query(sql_query, values);
    return result.recordset;
}

export const retrieveExistingAlbum = async (albumDetails) => {
    const albumResults = await retrieveAlbumByName(albumDetails.name);

    for (let albumResult in albumResult) {

    }
}