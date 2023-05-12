CREATE TABLE [Song] (
  [id] int NOT NULL IDENTITY(1, 1),
  [genre_id] int NOT NULL,
  [album_id] int NOT NULL,
  [song_url] varchar(8000) NOT NULL,
  [bitrate] int,
  [duration] int,
  [plays] int NOT NULL,
  [liked] bit NOT NULL
)
GO

CREATE TABLE [Artist] (
  [id] int NOT NULL IDENTITY(1, 1),
  [name] VARCHAR(200) NOT NULL
)
GO

CREATE TABLE [SongArtist] (
  [id] int NOT NULL IDENTITY(1, 1),
  [song_id] int NOT NULL,
  [artist_id] int NOT NULL
)
GO

CREATE TABLE [Genre] (
  [id] int NOT NULL IDENTITY(1, 1),
  [name] varchar(100)
)
GO

CREATE TABLE [Album] (
  [id] int NOT NULL IDENTITY(1, 1),
  [title] varchar(200),
  [coverart_url] varchar(8000) NOT NULL,
  [release_date] date
)
GO

CREATE TABLE [Playlist] (
  [id] int NOT NULL IDENTITY(1, 1),
  [title] varchar(200)
)
GO

CREATE TABLE [PlaylistSong] (
  [id] int NOT NULL IDENTITY(1, 1),
  [playlist_id] int NOT NULL,
  [song_id] int NOT NULL
)
GO

ALTER TABLE [Song] ADD FOREIGN KEY ([genre_id]) REFERENCES [Genre] ([id])
GO

ALTER TABLE [SongArtist] ADD FOREIGN KEY ([song_id]) REFERENCES [Song] ([id])
GO

ALTER TABLE [SongArtist] ADD FOREIGN KEY ([artist_id]) REFERENCES [Artist] ([id])
GO

ALTER TABLE [Song] ADD FOREIGN KEY ([album_id]) REFERENCES [Album] ([id])
GO

ALTER TABLE [PlaylistSong] ADD FOREIGN KEY ([song_id]) REFERENCES [Song] ([id])
GO

ALTER TABLE [PlaylistSong] ADD FOREIGN KEY ([playlist_id]) REFERENCES [Playlist] ([id])
GO
