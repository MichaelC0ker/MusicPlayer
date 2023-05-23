import sql  from "mssql";
import databasePool from '../data/index.js'

const pool = await databasePool;

export const retrieveArtistByName = async(artistName) => {
    let sql_query = `SELECT id, name FROM [Artist] 
                        WHERE name = @artist`;
    const result = await pool.request()
                    .input('artist', sql.VarChar, artistName)
                    .query(sql_query);

    return result.recordset;
}

export const getArtistsOfSong = async(songId) => {
    let sql_query = `SELECT artist_id
                        FROM [SongArtist] 
                        WHERE song_id = @song`;
    const result = await pool.request()
            .input('song', sql.VarChar, songId)
            .query(sql_query);
    
    sql_query = `SELECT id, name
                    FROM [Artist] 
                    WHERE id IN @artists`;

    const artistResult = await pool.request()
            .input('artists', result)
            .query(sql_query);

    return artistResult.recordset;
}

export const getArtistsSong = async (artistId) => {
    let sql_query = `SELECT song_id, main_artist
                        FROM [SongArtist] 
                        WHERE artist_id = @artist`;

    const result = await pool.request()
                .input('artist', sql.Int, artistId)
                .query(sql_query);

    return result.recordset;
}

export const addArtist = async(artistDetails) => {
    // change logic
    // const columns = Object.keys(artistDetails);
    const values = [artistDetails];
    console.log(values);
    let sql_query = `INSERT INTO [Artist](name) VALUES (${values.map((_,i) => `@param_${i}`)});
                    SELECT SCOPE_IDENTITY() AS id;`;

    const request = pool.request();
    for (let i = 0; i < values.length; i++)
        request.input(`param_${i}`, values[i]);
    const result = await request.query(sql_query);

    return result.recordset;
}

export const addSongArtists = async(artists) => {
    const values = Object.values(artists);
    
    let sql_query = `INSERT INTO [SongArtist](song_id, artist_id, main_artist) VALUES (${values.map((_,i) => `@param_${i}`)});
                    SELECT SCOPE_IDENTITY() AS id;`;

    const request = pool.request();
    for (let i = 0; i < values.length; i++)
        request.input(`param_${i}`, values[i]);
    const result = await request.query(sql_query);

    return result.recordset;
}
