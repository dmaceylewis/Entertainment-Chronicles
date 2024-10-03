USE [master]
GO
IF db_id('EChronicles') IS NULL
  CREATE DATABASE [EChronicles]
GO
USE [EChronicles]
GO

-- DROP TABLE IF NEEDED --
DROP TABLE IF EXISTS [Users];
DROP TABLE IF EXISTS [Collections];
DROP TABLE IF EXISTS [Series];
DROP TABLE IF EXISTS [Books];
DROP TABLE IF EXISTS [Shows];
DROP TABLE IF EXISTS [Movies];
DROP TABLE IF EXISTS [Season];
DROP TABLE IF EXISTS [Platforms];

-- CREATE TABLES --
SET IDENTITY_INSERT Users ON
CREATE TABLE [Users] (
  [id] int PRIMARY KEY IDENTITY,
  [name] nvarchar(255) NOT NULL,
  [email] nvarchar(255) NOT NULL
)
SET IDENTITY_INSERT Users OFF
GO

SET IDENTITY_INSERT Collections ON
CREATE TABLE [Collections] (
  [id] int PRIMARY KEY IDENTITY,
  [userId] int NOT NULL,
  [name] nvarchar(255) NOT NULL,

  -- CONSTRAINT [FK_Collections_Users] FOREIGN KEY ([userId]) REFERENCES [Users] ([id])
)
SET IDENTITY_INSERT Collections OFF
GO

SET IDENTITY_INSERT Series ON
CREATE TABLE [Series] (
  [id] int PRIMARY KEY IDENTITY,
  [name] nvarchar(255) NOT NULL,
  [collectionId] int NOT NULL,

  -- CONSTRAINT [FK_Series_Collections] FOREIGN KEY ([collectionId]) REFERENCES [Collections] ([id])
)
SET IDENTITY_INSERT Series OFF
GO

SET IDENTITY_INSERT Books ON
CREATE TABLE [Books] (
  [id] int PRIMARY KEY IDENTITY,
  [title] nvarchar(255) NOT NULL,
  [author] nvarchar(255) NOT NULL,
  [order] int NOT NULL,
  [read] bit NOT NULL,
  [platformId] int NOT NULL,
  [seriesId] int NOT NULL
)
SET IDENTITY_INSERT Books OFF
GO

SET IDENTITY_INSERT Shows ON
CREATE TABLE [Shows] (
  [id] int PRIMARY KEY IDENTITY,
  [title] nvarchar(255) NOT NULL,
  [order] int NOT NULL,
  [watched] bit NOT NULL,
  [seasonId] int NOT NULL,
  [platformId] int NOT NULL,
  [seriesId] int NOT NULL
)
SET IDENTITY_INSERT Shows OFF
GO

SET IDENTITY_INSERT Movies ON
CREATE TABLE [Movies] (
  [id] int PRIMARY KEY IDENTITY,
  [title] nvarchar(255) NOT NULL,
  [order] int NOT NULL,
  [watched] bit NOT NULL,
  [platformId] int NOT NULL,
  [seriesId] int NOT NULL
)
SET IDENTITY_INSERT Movies OFF
GO

SET IDENTITY_INSERT Season ON
CREATE TABLE [Season] (
  [id] int PRIMARY KEY IDENTITY,
  [number] int NOT NULL,
  [episode] int NOT NULL
)
SET IDENTITY_INSERT Season OFF
GO

SET IDENTITY_INSERT Platforms ON
CREATE TABLE [Platforms] (
  [id] int PRIMARY KEY IDENTITY,
  [name] nvarchar(255) NOT NULL
)
SET IDENTITY_INSERT Platforms OFF
GO

-- ADD FOREIGN KEYS TO TABLES --
ALTER TABLE [Collections] ADD FOREIGN KEY ([userId]) REFERENCES [Users] ([id])
GO

ALTER TABLE [Series] ADD FOREIGN KEY ([collectionId]) REFERENCES [Collections] ([id])
GO

ALTER TABLE [Shows] ADD FOREIGN KEY ([seriesId]) REFERENCES [Series] ([id])
GO

ALTER TABLE [Books] ADD FOREIGN KEY ([seriesId]) REFERENCES [Series] ([id])
GO

ALTER TABLE [Shows] ADD FOREIGN KEY ([seasonId]) REFERENCES [Season] ([id])
GO

ALTER TABLE [Movies] ADD FOREIGN KEY ([seriesId]) REFERENCES [Series] ([id])
GO

ALTER TABLE [Books] ADD FOREIGN KEY ([platformId]) REFERENCES [Platforms] ([id])
GO

ALTER TABLE [Movies] ADD FOREIGN KEY ([platformId]) REFERENCES [Platforms] ([id])
GO

ALTER TABLE [Shows] ADD FOREIGN KEY ([platformId]) REFERENCES [Platforms] ([id])
GO
