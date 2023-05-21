import sql  from "mssql";
import databasePool from '../data/index.js'

const pool = await databasePool;

export const retrieveAlbumByName = async(albumName) => {
    let sql_query = `SELECT id, title, coverart_url, release_date
                        FROM [Album] 
                        WHERE title = @title`;

    const result = await pool.request()
                    .input('title', sql.VarChar, albumName)
                    .query(sql_query);

    return result.recordset;
}

export const addAlbum = async(albumDetails) => {
    const columns = Object.keys(albumDetails);
    const values = Object.values(albumDetails);
    
    let sql_query = `INSERT INTO [Album](${columns}) VALUES (${new Array(columns.length()).fill('?')})
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