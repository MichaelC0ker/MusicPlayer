import { retrieveUser } from "../services/userService.js";
import { retrieveGenreByName, addGenre } from "../services/genreService.js";
import { retrieveArtistByName, addArtist, addSongArtists, getArtistsOfSong, getArtistsSong } from "../services/artistService.js";
import { addAlbum, retrieveAlbum } from "../services/albumService.js";
import { addSong, retrieveSongs, removeSong, retrieveSong } from "../services/songService.js";

import httpStatus from 'http-status-codes';


export const uploadSong = async (body) => {
    const data = JSON.parse(body);
    // console.log(data);
    let {username, title, genre, album, artist} = data;

    const user = await retrieveUser(username);

    let song = {
        title: title,
        user_id: user[0].id,
        song_url: title,
        plays: 0,
        liked: 0
    }
    // add genre
    let genreResult = await retrieveGenreByName(genre);
    // let insertGenreResult = undefined;
    if (genreResult.length === 0) {
        genreResult = await addGenre(genre);
        console.log(genreResult);
    }
    song['genre_id'] = genreResult[0].id;

    // add artist
    let artistResult = await retrieveArtistByName(artist);
    if (artistResult.length === 0) {
        // assume that album does not exist
        let albumResult = await addAlbum(album);
        song['album_id'] = albumResult[0].id;
        console.log('Add artist')
        // add artist to Artist table
        artistResult = await addArtist(artist);
        console.log('Add song')
        // add song to Song table
        
    } else {
        // check if album exists
        const artistSongs = await getArtistsSong(artistResult[0].id);
        
        // 1. C

        for (const key in artistSongs) {
            const artist = artistSongs[key];
            // console.log(artistSongs[key]);
            
            const existingSong = await retrieveSong(artist.song_id);
            const albumResult = await retrieveAlbum(existingSong[0].album_id);

            if (albumResult.length !== 0 ) {
                // check if album is the same
                if (albumResult[0].title === album.title) {
                    // album exists
                    if (user[0])
                    song['album_id'] = albumResult[0].id;
                    break;
                }
            }
            
        }

        if (song['album_id'] === undefined) {
            // album does not exist, add
            let albumResult = await addAlbum(album);
            song['album_id'] = albumResult[0].id;
        }
        
    }
    
    console.log(song);
    // add song
    const songResult = await addSong(song);

    // add artist/s with SongArtist
    let artists = {
        song_id: songResult[0].id,
        artist_id: artistResult[0].id,
        main_artist: true
    }

    await addSongArtists(artists);
    
    return {
        status: httpStatus.OK,
        data: {
            message: 'Song added successfully'
        }
    }
} 

export const getSong = async (param) => {

    const song = await retrieveSong(param);

    return {
        status: httpStatus.OK,
        data: {
            song
        }
    };
    

}

export const getAllSongs = async (body) => {
    const data = JSON.parse(body);

    let { username } = data;

    const user = await retrieveUser(username);

    const songs = await retrieveSongs(user[0].id);

    return {
        status: httpStatus.OK,
        data: {
            songs
        }
    };

}

export const deleteSong = async (param) => {

    try {
        await removeSong(param);
        return {
            status: httpStatus.OK,
            data: {
                message: 'Song deleted successfully'
            }
        };
    } catch (error) {
        return {
            status: httpStatus.NOT_FOUND,
            data: {
                message: 'Song was not found'
            }
        };
    }
}