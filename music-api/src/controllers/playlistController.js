import { retrieveUser } from '../services/userService.js';
import { addPlaylist, addPlaylistSong, retrievePlaylists, retrievePlaylist, retrievePlaylistSongs, removePlaylist, removeSongFromPlaylist, updatePlaylistDetails } from '../services/playlistService.js';

import httpStatus from 'http-status-codes';


export const createPlaylist = async (body) => {
  const data = JSON.parse(body);

  const user = await retrieveUser(data.username);

  const playlist = {
    title: data.title,
    description: data.description,
    user_id: user[0].id
  };

  const playlistResult = await addPlaylist(playlist);

  console.log(data.songs);
  for (const songId of data.songs) {
    console.log(songId);
    const playlistSong = {
      playlist_id: playlistResult[0].id,
      song_id: songId
    };

    await addPlaylistSong(playlistSong);
  }

  return {
    status: httpStatus.OK,
    data: {
      message: 'Playlist added successfully'
    }
  };
};

export const addSongToPlaylist = async (body) => {
  const data = JSON.parse(body);

  await addPlaylistSong(data);

  return {
    status: httpStatus.OK,
    data: {
      message: 'Song added to playlist successfully'
    }
  };
};

export const getAllPlaylists = async (body) => {
  const data = JSON.parse(body);

  const { username } = data;

  const user = await retrieveUser(username);

  const playlists = await retrievePlaylists(user[0].id);

  return {
    status: httpStatus.OK,
    data: {
      playlists
    }
  };
};

export const getPlaylist = async (param) => {
  const playlist = (await retrievePlaylist(param))[0];
  console.log(playlist);
  const playlistSongs = await retrievePlaylistSongs(playlist.id);

  playlist.songs = playlistSongs;
  return {
    status: httpStatus.OK,
    data: {
      playlist
    }
  };

};

export const updatePlaylistInfo = async (body) => {
  const data = JSON.parse(body);

  await updatePlaylistDetails(data.field, data.value);

  return {
    status: httpStatus.OK,
    data: {
      message: 'Update playlist successfully'
    }
  };
};

export const deletePlaylist = async (param) => {
  await removePlaylist(param);

  return {
    status: httpStatus.OK,
    data: {
      message: 'Playlist deleted successfully'
    }
  };
};

export const removeSong = async (param) => {
  await removeSongFromPlaylist(param);

  return {
    status: httpStatus.OK,
    data: {
      message: 'Song removed successfully from playlist'
    }
  };
};
