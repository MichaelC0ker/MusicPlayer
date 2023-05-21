import { retrieveUser } from "../services/userService.js";
import { retrieveGenreByName, addGenre } from "../services/genreService.js";
import { retrieveArtistByName, addArtist, addSongArtists } from "../services/artistService.js";
import { addAlbum } from "../services/albumService.js";
import { addSong } from "../services/songService.js";

export default async (body) => {
    const data = JSON.parse(body);
    // console.log(data);
    let {username, title, genre, album, artist} = data;

    const user = await retrieveUser(username);
    // add genre
    let genreResult = await retrieveGenreByName(genre);
    // let insertGenreResult = undefined;
    if (genreResult.length === 0) {
        genreResult = await addGenre(genre);
        console.log(genreResult);
    }

    // add artist
    let artistResult = await retrieveArtistByName(artist);
    if (artistResult.length === 0) {
        // assume that album does not exist
        let albumResult = await addAlbum(album);
        console.log('Add artist')
        // add artist to Artist table
        let artistResult = await addArtist(artist);
        console.log('Add song')
        // add song to Song table
        const song = {
            title: title,
            genre_id: genreResult[0].id,
            album_id: albumResult[0].id,
            user_id: user[0].id,
            song_url: title,
            plays: 0,
            liked: 0
        };

        const songResult = await addSong(song);

        // add artist/s with SongArtist
        let artists = {
            song_id: songResult[0].id,
            artist_id: artistResult[0].id,
            main_artist: true
        }

        await addSongArtists(artists);

    } else {
        // album exists
    }

    // add album


} 