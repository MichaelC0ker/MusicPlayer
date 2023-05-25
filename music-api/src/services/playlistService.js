import sql from 'mssql';
import databasePool from '../data/index.js';

const pool = await databasePool;


export const retrievePlaylist = async (playlistId) => {
  const sql_query = `SELECT id, title, description, user_id
                      FROM [Playlist] 
                      WHERE id = @playlist_id`;
  const result = await pool.request()
    .input('playlist_id', sql.Int, playlistId)
    .query(sql_query);

  return result.recordset;
};

export const retrievePlaylists = async (userId) => {
  const sql_query = `SELECT id, title, description, user_id
                      FROM [Playlist] 
                      WHERE user_id = @user_id`;
  const result = await pool.request()
    .input('user_id', sql.Int, userId)
    .query(sql_query);

  return result.recordset;
};

export const retrievePlaylistSongs = async (playlistId) => {
  const sql_query = `SELECT s.id, s.title, s.song_url, s.coverart_url, s.bitrate, s.duration, s.plays, s.liked
                      FROM [Song] s
                      INNER JOIN [SongPlaylist] sp ON s.id=sp.song_id
                      WHERE sp.playlist_id = @playlist_id`;
  const result = await pool.request()
    .input('playlist_id', sql.Int, playlistId)
    .query(sql_query);

  return result.recordset;
};

export const addPlaylist = async (playlistDetails) => {
  // change logic
  // const columns = Object.keys(songDetails);
  const values = Object.values(playlistDetails);
  
  const sql_query = `INSERT INTO [Playlist](title, description, user_id) VALUES (${values.map((_, i) => `@param_${i}`)}); 
                  SELECT SCOPE_IDENTITY() AS id;`;
  
  const request = pool.request();

  for (let i = 0; i < values.length; i++) { request.input(`param_${i}`, values[i]); }
  const result = await request.query(sql_query);

  return result.recordset;
};

export const addPlaylistSong = async (details) => {
  // change logic
  // const columns = Object.keys(songDetails);
  const values = Object.values(details);
  
  const sql_query = `INSERT INTO [SongPlaylist](playlist_id, song_id) VALUES (${values.map((_, i) => `@param_${i}`)}); 
                  SELECT SCOPE_IDENTITY() AS id;`;
  
  const request = pool.request();

  for (let i = 0; i < values.length; i++) { request.input(`param_${i}`, values[i]); }
  const result = await request.query(sql_query);

  return result.recordset;
};

export const removeSongFromPlaylist = async (songId) => {
  const sql_query = 'DELETE FROM [SongPlaylist] WHERE song_id = @song';

  const result = pool.request()
    .input('song', sql.Int, songId)
    .query(sql_query);

  return result;
}; 

export const removePlaylist = async (playlistId) => {
  let sql_query = 'DELETE FROM [SongPlaylist] WHERE playlist_id = @playlistId';

  let result = pool.request()
    .input('playlistId', sql.Int, playlistId)
    .query(sql_query);

  sql_query = 'DELETE FROM [Playlist] WHERE id = @playlistId';

  result = pool.request()
    .input('playlistId', sql.Int, playlistId)
    .query(sql_query);
  return result;
}; 

export const updatePlaylistDetails = async (field, newValue) => {
  const sql_query = ''.concat(`UPDATE [SongPlaylist] SET ${field} = @newValue`);

  const result = pool.request()
    .input('newValue', sql.VarChar, newValue)
    .query(sql_query);

  return result;
}; 

