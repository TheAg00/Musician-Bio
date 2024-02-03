CREATE DATABASE links;
USE links;
CREATE TABLE websites (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO websites (name, url, type)
VALUES
	('The Weeknd', 'https://www.theweeknd.com/', 'official-website'),
    ('X O  S T O R E', 'https://xo.store/', 'official-website'),
    ('TheWeekndVEVO | YouTube', 'https://www.youtube.com/channel/UCF_fDSgPpBQuh1MsUTgIARQ', 'stream-music'),
    ('The Weeknd | Spotify', 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ', 'stream-music'),
    ('The Weeknd | Apple Music', 'https://music.apple.com/us/artist/the-weeknd/479756766', 'stream-music'),
    ('theweeknd | Instagram', 'https://www.instagram.com/theweeknd/', 'social-media'),
    ('Abel Tesfaye | X', 'https://twitter.com/theweeknd', 'social-media'),
    ('The Weeknd | Facebook', 'https://www.facebook.com/theweeknd/', 'social-media'),
    ('The Weeknd | TikTok', 'https://www.tiktok.com/@theweeknd', 'social-media'),
    ('Wikipedia', 'https://en.wikipedia.org/wiki/The_Weeknd', 'resources'),
    ('BestSellingAlbums.org', 'https://bestsellingalbums.org/artist/13284', 'resources'),
    ('kworb.net', 'https://kworb.net/spotify/artist/1Xyo4u8uXC1ZmMpatF05PJ_albums.html', 'resources'),
    ('biography.com', 'https://www.biography.com/musicians/the-weeknd', 'resources'),
    ('classicrockhistory.com', 'https://www.classicrockhistory.com/complete-list-of-the-weeknd-albums-and-songs/', 'resources');
