import sql  from "mssql";
import databasePool from '../data/index.js'

const pool = await databasePool;

export const retrieveSong = async(songId) => {
    let sql_query = `SELECT title, song_url, genre_id, album_id, user_id, song_url, bitrate, duration, plays, liked
                        FROM [Song] 
                        WHERE id = @song_id`;
    const result = await pool.request()
                    .input('song_id', sql.Int, songId)
                    .query(sql_query);

    return result.recordset;
}
    
    
export const retrieveSongs = async(userId) => {
    let sql_query = `SELECT id, title, song_url, bitrate, duration, plays, liked
                        FROM [Song] 
                        WHERE user_id = @user_id`;
    const result = await pool.request()
                    .input('user_id', sql.Int, userId)
                    .query(sql_query);

    return result.recordset;
}

export const addSong = async(songDetails) => {
    // change logic
    const columns = Object.keys(songDetails);
    const values = Object.values(songDetails);
    
    let sql_query = `INSERT INTO [Song](${columns}) VALUES (${values.map((_,i) => `@param_${i}`)}); 
                    SELECT SCOPE_IDENTITY() AS id;`;
    
                    const request = pool.request();
    for (let i = 0; i < values.length; i++)
        request.input(`param_${i}`, values[i]);
    const result = await request.query(sql_query);
    return result.recordset;
}

export const removeSong = async(song_id) => {
    let sql_query = `DELETE FROM SongArtist WHERE song_id = @song`;

    let result = pool.request()
                .input('song', sql.Int, song_id)
                .query(sql_query);

    sql_query = `DELETE FROM Song WHERE id = @song`;

    result = pool.request()
                .input('song', sql.Int, song_id)
                .query(sql_query);
    return result;
} 

