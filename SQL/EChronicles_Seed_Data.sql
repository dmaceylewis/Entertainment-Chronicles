﻿﻿USE [EChronicles]
GO

SET IDENTITY_INSERT Users ON
INSERT INTO Users (Id, [Name], Email) VALUES (1, 'Macey Lewis', 'me@example.com');
INSERT INTO Users (Id, [Name], Email) VALUES (2, 'Bob Johnson', 'bob@example.com');
SET IDENTITY_INSERT Users OFF

SET IDENTITY_INSERT Collections ON
INSERT INTO Collections (Id, UserId, [Name]) VALUES (1, 1, 'Savage SMB Collection');
INSERT INTO Collections (Id, UserId, [Name]) VALUES (2, 1, 'Blood, Flesh, Fire, & Ash Collection');
INSERT INTO Collections (Id, UserId, [Name]) VALUES (3, 1, 'Star Wars Collection');
SET IDENTITY_INSERT Collections OFF

SET IDENTITY_INSERT Series ON
INSERT INTO Series (Id, [Name], [Order], CollectionId) VALUES (1, 'Darkness Series', 1, 1);
INSERT INTO Series (Id, [Name], [Order], CollectionId) VALUES (2, 'Collector Series', 3, 1);
INSERT INTO Series (Id, [Name], [Order], CollectionId) VALUES (3, 'Devil in the Deep Blue Sea Series', 4, 1);
INSERT INTO Series (Id, [Name], [Order], CollectionId) VALUES (4, 'Lightness Saga Series', 2, 1);
INSERT INTO Series (Id, [Name], [Order], CollectionId) VALUES (5, 'Savage Lands Series', 5, 1);

INSERT INTO Series (Id, [Name], [Order], CollectionId) VALUES (6, 'Flesh and Fire Series', 1, 2);
INSERT INTO Series (Id, [Name], [Order], CollectionId) VALUES (7, 'Blood and Ash Series', 1, 2);

INSERT INTO Series (Id, [Name], [Order], CollectionId) VALUES (8, 'Clone Wars Series', 4, 3);
SET IDENTITY_INSERT Series OFF

-- PLATFORMS --
SET IDENTITY_INSERT Platforms ON
INSERT INTO Platforms (Id, [Name]) VALUES (1, 'Audible');
INSERT INTO Platforms (Id, [Name]) VALUES (2, 'Disney Plus');
INSERT INTO Platforms (Id, [Name]) VALUES (3, 'Hulu');
SET IDENTITY_INSERT Platforms OFF

-- SEASONS FOR TV SHOWS --
SET IDENTITY_INSERT Season ON
-- INSERT INTO Season (id, number, episode) VALUES (1, 1, 1);
-- INSERT INTO Season (id, number, episode) VALUES (2, 1, 2);

-- INSERT INTO Season including multiple seasons with MAX 50 episodes --
DECLARE @season INT;
DECLARE @episode INT;
DECLARE @maxId INT;

-- Get the current maximum Id in the Season table to avoid duplicates
SELECT @maxId = ISNULL(MAX(Id), 0) FROM Season;

-- Loop through seasons (1 to 20)
SET @season = 1;
WHILE @season <= 20
BEGIN
    SET @episode = 1;  -- Reset episode count for each season

    -- Loop through episodes (1 to 50)
    WHILE @episode <= 50
    BEGIN
        INSERT INTO Season (Id, [Number], Episode)
        VALUES (@maxId + (@season - 1) * 50 + @episode + 1, @season, @episode);  -- Calculate unique ID

        SET @episode = @episode + 1;  -- Increment episode
    END;

    SET @season = @season + 1;  -- Increment season
END;
SET IDENTITY_INSERT Season OFF

-- BOOKS --
SET IDENTITY_INSERT Books ON
-- Darkness Series by Stacey Marie Brown --
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (1, 'Darkness of Light', 'Stacey Marie Brown', 1, 1, 1, 1);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (2, 'Fire in the Darkness', 'Stacey Marie Brown', 2, 1, 2, 1);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (3, 'Beast in the Darkness', 'Stacey Marie Brown', 2.5, 1, 1, 1);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (4, 'Dwellers of Darkness', 'Stacey Marie Brown', 3, 1, 1, 1);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (5, 'West', 'Stacey Marie Brown', 5, 0, 1, 1);

-- Collector Series by Stacey Marie Brown --
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (6, 'City in Embers', 'Stacey Marie Brown', 1, 0, 1, 2);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (7, 'The Barrier Between', 'Stacey Marie Brown', 2, 0, 1, 2);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (8, 'Across the Divide', 'Stacey Marie Brown', 3, 0, 1, 2);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (9, 'From Burning Ashes', 'Stacey Marie Brown', 4, 0, 1, 2);

-- Devil in the Deep Blue Sea Series by Stacey Marie Brown --
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (10, 'Silver Tongue Devil', 'Stacey Marie Brown', 1, 1, 1, 3);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (11, 'Devil in Boots', 'Stacey Marie Brown', 2, 1, 1, 3);

-- Lightness Saga Series by Stacey Marie Brown --
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (12, 'The Crown of Light', 'Stacey Marie Brown', 1, 1, 1, 4);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (13, 'Lightness Falling', 'Stacey Marie Brown', 2, 1, 1, 4);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (14, 'Fall of the King', 'Stacey Marie Brown', 3, 1, 1, 4);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (15, 'Rise from the Embers', 'Stacey Marie Brown', 4, 1, 1, 4);

-- Savage Lands Series by Stacey Marie Brown --
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (16, 'Savage Lands', 'Stacey Marie Brown', 1, 1, 1, 5);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (17, 'Wild Lands', 'Stacey Marie Brown', 2, 1, 1, 5);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (18, 'Dead Lands', 'Stacey Marie Brown', 3, 1, 1, 5);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (19, 'Bad Lands', 'Stacey Marie Brown', 4, 1, 1, 5);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (20, 'Blood Lands', 'Stacey Marie Brown', 5, 1, 1, 5);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (21, 'Shadow Lands', 'Stacey Marie Brown', 6, 1, 1, 5);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (22, 'Land of Ashes', 'Stacey Marie Brown', 7, 1, 1, 5);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (23, 'Land of Monsters', 'Stacey Marie Brown', 8, 0, 1, 5);

-- Flesh and Fire Series by Jennifer Armentrout --
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (24, 'A Shadow in the Ember', 'Jennifer Armentrout', 1, 1, 1, 6);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (25, 'A Light in the Flame', 'Jennifer Armentrout', 2, 1, 1, 6);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (26, 'A Fire in the Flesh', 'Jennifer Armentrout', 3, 1, 1, 6);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (27, 'Born of Blood and Ash', 'Jennifer Armentrout', 4, 1, 1, 6);

-- Blood and Ash Series by Jennifer Armentrout --
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (28, 'From Blood and Ash', 'Jennifer Armentrout', 1, 1, 1, 7);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (29, 'A Kingdom of Flesh and Fire', 'Jennifer Armentrout', 2, 1, 1, 7);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (30, 'The Crown of Gilded Bones', 'Jennifer Armentrout', 3, 1, 1, 7);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (31, 'The War of Two Queens', 'Jennifer Armentrout', 4, 1, 1, 7);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (32, 'A Soul of Ash and Blood', 'Jennifer Armentrout', 5, 1, 1, 7);
INSERT INTO Books (Id, Title, Author, [Order], [Read], PlatformId, SeriesId) VALUES (33, 'The Primal of Blood and Bone', 'Jennifer Armentrout', 6, 0, 1, 7);
SET IDENTITY_INSERT Books OFF

-- TV SHOWS --
SET IDENTITY_INSERT Shows ON
INSERT INTO Shows (Id, Title, [Order], Watched, SeasonId, PlatformId, SeriesId) VALUES (1, 'Clone Wars', 4, 1, 2, 1, 8);
INSERT INTO Shows (Id, Title, [Order], Watched, SeasonId, PlatformId, SeriesId) VALUES (2, 'Star Wars Rebels', 7, 0, 2, 2, 8);
SET IDENTITY_INSERT Shows OFF

-- MOVIES --
SET IDENTITY_INSERT Movies ON
INSERT INTO Movies (Id, Title, [Order], Watched, PlatformId, SeriesId) VALUES (1, 'Episode 1: Phantom Menace', 1, 1, 1, 8);
INSERT INTO Movies (Id, Title, [Order], Watched, PlatformId, SeriesId) VALUES (2, 'Episode 2: Attack of the Clones', 2, 0, 2, 8);
INSERT INTO Movies (Id, Title, [Order], Watched, PlatformId, SeriesId) VALUES (3, 'Clone Wars', 3, 0, 2, 8);
INSERT INTO Movies (Id, Title, [Order], Watched, PlatformId, SeriesId) VALUES (4, 'Episode 3: Revenge of the Sith', 5, 0, 2, 8);
INSERT INTO Movies (Id, Title, [Order], Watched, PlatformId, SeriesId) VALUES (5, 'Solo', 6, 0, 2, 8);
SET IDENTITY_INSERT Movies OFF