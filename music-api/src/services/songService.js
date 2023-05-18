import sql  from "mssql";
import databasePool from '../data/index.js'

const pool = await databasePool;

export const retrieveSong = async(songId) => {
    let sql_query = `SELECT title, song_url, bitrate, duration, plays, liked
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
    
    let sql_query = 'INSERT INTO [Song](title, genre_id, album_id, user_id, song_url, bitrate, duration, plays, liked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const result = await pool.execute(sql_query, [songDetails],
                    () => {

                    });
    return result.recordset;
}


