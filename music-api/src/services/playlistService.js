import sql  from "mssql";
import databasePool from '../data/index.js'

const pool = await databasePool;


export const retrievePlaylist = async(playlistId) => {
  let sql_query = `SELECT title, description, user_id
                      FROM [Playlist] 
                      WHERE id = @playlist_id`;
  const result = await pool.request()
                  .input('playlist_id', sql.Int, playlistId)
                  .query(sql_query);

  return result.recordset;
}

export const retrievePlaylists = async(userId) => {
  let sql_query = `SELECT id, title, description, user_id
                      FROM [Playlist] 
                      WHERE user_id = @user_id`;
  const result = await pool.request()
                  .input('user_id', sql.Int, userId)
                  .query(sql_query);

  return result.recordset;
}

export const retrievePlaylistSongs = async(playlistId) => {
  let sql_query = `SELECT id, song_id
                      FROM [SongPlaylist] sp
                      INNER JOIN [Playlist] p ON sp.playlist_id=s.p.id
                      WHERE p.id = @playlist_id`;
  const result = await pool.request()
                  .input('playlist_id', sql.Int, playlistId)
                  .query(sql_query);

  return result.recordset;
}

export const addPlaylist = async(playlistDetails) => {
  // change logic
  // const columns = Object.keys(songDetails);
  const values = Object.values(playlistDetails);
  
  let sql_query = `INSERT INTO [Playlist](title, description, user_id) VALUES (${values.map((_,i) => `@param_${i}`)}); 
                  SELECT SCOPE_IDENTITY() AS id;`;
  
  const request = pool.request();
  for (let i = 0; i < values.length; i++)
      request.input(`param_${i}`, values[i]);
  const result = await request.query(sql_query);
  return result.recordset;
}

export const addPlaylistSong = async(details) => {
  // change logic
  // const columns = Object.keys(songDetails);
  const values = Object.values(details);
  
  let sql_query = `INSERT INTO [SongPlaylist](playlist_id, song_id) VALUES (${values.map((_,i) => `@param_${i}`)}); 
                  SELECT SCOPE_IDENTITY() AS id;`;
  
  const request = pool.request();
  for (let i = 0; i < values.length; i++)
      request.input(`param_${i}`, values[i]);
  const result = await request.query(sql_query);
  return result.recordset;
}

export const removeSongFromPlaylist = async(songId) => {
  let sql_query = `DELETE FROM [SongPlaylist] WHERE song_id = @song`;

  let result = pool.request()
              .input('song', sql.Int, songId)
              .query(sql_query);

  return result;
} 

export const removePlaylist = async(playlistId) => {
  let sql_query = `DELETE FROM [SongPlaylist] WHERE playlist_id = @playlistId`;

  let result = pool.request()
              .input('playlistId', sql.Int, playlistId)
              .query(sql_query);

  sql_query = `DELETE FROM [Playlist] WHERE id = @playlistId`;

  result = pool.request()
              .input('playlistId', sql.Int, playlistId)
              .query(sql_query);
  return result;
} 

export const updatePlaylistDetails = async(field, newValue) => {
  let sql_query = ''.concat('UPDATE [SongPlaylist] SET '+ field + ' = @newValue');

  let result = pool.request()
              .input('newValue', sql.VarChar, newValue)
              .query(sql_query);

  return result;
} 

