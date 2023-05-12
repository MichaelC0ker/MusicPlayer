CREATE TABLE `Song` (
  `id` int NOT NULL AUTO_INCREMENT,
  `genre_id` int NOT NULL,
  `album_id` int NOT NULL,
  `song_url` varchar(8000) NOT NULL,
  `bitrate` int,
  `duration` int,
  `plays` int NOT NULL,
  `liked` bit NOT NULL
);

CREATE TABLE `Artist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL
);

CREATE TABLE `SongArtist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `song_id` int NOT NULL,
  `artist_id` int NOT NULL
);

CREATE TABLE `Genre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100)
);

CREATE TABLE `Album` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200),
  `coverart_url` varchar(8000) NOT NULL,
  `release_date` date
);

CREATE TABLE `Playlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200)
);

CREATE TABLE `PlaylistSong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `playlist_id` int NOT NULL,
  `song_id` int NOT NULL
);

ALTER TABLE `Song` ADD FOREIGN KEY (`genre_id`) REFERENCES `Genre` (`id`);

ALTER TABLE `SongArtist` ADD FOREIGN KEY (`song_id`) REFERENCES `Song` (`id`);

ALTER TABLE `SongArtist` ADD FOREIGN KEY (`artist_id`) REFERENCES `Artist` (`id`);

ALTER TABLE `Song` ADD FOREIGN KEY (`album_id`) REFERENCES `Album` (`id`);

ALTER TABLE `PlaylistSong` ADD FOREIGN KEY (`song_id`) REFERENCES `Song` (`id`);

ALTER TABLE `PlaylistSong` ADD FOREIGN KEY (`playlist_id`) REFERENCES `Playlist` (`id`);
