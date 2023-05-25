import sql from 'mssql';
import databasePool from '../data/index.js';
import { retrieveGenreById } from './genreService.js';
import { retrieveAlbum  } from './albumService.js';
import { getArtistsOfSong } from './artistService.js';

const pool = await databasePool;

export const retrieveSong = async(songId) => {
    let sql_query = `SELECT title, genre_id, album_id, user_id, song_url, bitrate, duration, plays, liked
                        FROM [Song] 
                        WHERE id = @song_id`;
  const result = await pool.request()
    .input('song_id', sql.Int, songId)
    .query(sql_query);

  return result.recordset;
};

export const getFullSongDetails = async (songId) => {
    const songResult = (await retrieveSong(songId))[0];
    const genreResult = (await retrieveGenreById(songResult['genre_id']))[0];
    const albumResult = (await retrieveAlbum(songResult['album_id']))[0];
    const artistResult = (await getArtistsOfSong(songId))[0];

    return {
        title: songResult['title'],
        song_url: songResult['song_url'],
        genre: genreResult['name'],
        album: {
            title: albumResult['title'],
            release_year: albumResult['result_year']
        },
        artistResult: artistResult['name'],
        bitrate: songResult['bitrate'],
        durarion: songResult['duration'],
        plays: songResult['plays'],
        liked: songResult['liked']
    }
}
    
    
export const retrieveSongs = async (userId) => {
  const sql_query = `SELECT id, title, song_url, coverart_url, bitrate, duration, plays, liked
                        FROM [Song] 
                        WHERE user_id = @user_id`;
  const result = await pool.request()
    .input('user_id', sql.Int, userId)
    .query(sql_query);

  return result.recordset;
};

export const addSong = async (songDetails) => {
  // change logic
  const columns = Object.keys(songDetails);
  const values = Object.values(songDetails);
    
  const sql_query = `INSERT INTO [Song](${columns}) VALUES (${values.map((_, i) => `@param_${i}`)}); 
                    SELECT SCOPE_IDENTITY() AS id;`;
    
  const request = pool.request();

  for (let i = 0; i < values.length; i++) { request.input(`param_${i}`, values[i]); }
  const result = await request.query(sql_query);

  return result.recordset;
};

export const removeSong = async (song_id) => {
  let sql_query = 'DELETE FROM SongArtist WHERE song_id = @song';

  let result = pool.request()
    .input('song', sql.Int, song_id)
    .query(sql_query);

  sql_query = 'DELETE FROM Song WHERE id = @song';

  result = pool.request()
    .input('song', sql.Int, song_id)
    .query(sql_query);
  return result;
}; 

