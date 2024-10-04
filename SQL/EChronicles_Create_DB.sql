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
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL
)
SET IDENTITY_INSERT Users OFF
GO

SET IDENTITY_INSERT Collections ON
CREATE TABLE [Collections] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] int NOT NULL,
  [Name] nvarchar(255) NOT NULL,

  -- CONSTRAINT [FK_Collections_Users] FOREIGN KEY ([userId]) REFERENCES [Users] ([id])
)
SET IDENTITY_INSERT Collections OFF
GO

SET IDENTITY_INSERT Series ON
CREATE TABLE [Series] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [CollectionId] int NOT NULL,

  -- CONSTRAINT [FK_Series_Collections] FOREIGN KEY ([collectionId]) REFERENCES [Collections] ([id])
)
SET IDENTITY_INSERT Series OFF
GO

SET IDENTITY_INSERT Books ON
CREATE TABLE [Books] (
  [Id] int PRIMARY KEY IDENTITY,
  [Title] nvarchar(255) NOT NULL,
  [Author] nvarchar(255) NOT NULL,
  [Order] int NOT NULL,
  [Read] bit NOT NULL,
  [PlatformId] int NOT NULL,
  [SeriesId] int NOT NULL
)
SET IDENTITY_INSERT Books OFF
GO

SET IDENTITY_INSERT Shows ON
CREATE TABLE [Shows] (
  [Id] int PRIMARY KEY IDENTITY,
  [Title] nvarchar(255) NOT NULL,
  [Order] int NOT NULL,
  [Watched] bit NOT NULL,
  [SeasonId] int NOT NULL,
  [PlatformId] int NOT NULL,
  [SeriesId] int NOT NULL
)
SET IDENTITY_INSERT Shows OFF
GO

SET IDENTITY_INSERT Movies ON
CREATE TABLE [Movies] (
  [Id] int PRIMARY KEY IDENTITY,
  [Title] nvarchar(255) NOT NULL,
  [Order] int NOT NULL,
  [Watched] bit NOT NULL,
  [PlatformId] int NOT NULL,
  [SeriesId] int NOT NULL
)
SET IDENTITY_INSERT Movies OFF
GO

SET IDENTITY_INSERT Season ON
CREATE TABLE [Season] (
  [Id] int PRIMARY KEY IDENTITY,
  [Number] int NOT NULL,
  [Episode] int NOT NULL
)
SET IDENTITY_INSERT Season OFF
GO

SET IDENTITY_INSERT Platforms ON
CREATE TABLE [Platforms] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL
)
SET IDENTITY_INSERT Platforms OFF
GO

-- ADD FOREIGN KEYS TO TABLES --
ALTER TABLE [Collections] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [Series] ADD FOREIGN KEY ([CollectionId]) REFERENCES [Collections] ([Id])
GO

ALTER TABLE [Shows] ADD FOREIGN KEY ([SeriesId]) REFERENCES [Series] ([Id])
GO

ALTER TABLE [Books] ADD FOREIGN KEY ([SeriesId]) REFERENCES [Series] ([Id])
GO

ALTER TABLE [Shows] ADD FOREIGN KEY ([SeasonId]) REFERENCES [Season] ([Id])
GO

ALTER TABLE [Movies] ADD FOREIGN KEY ([SeriesId]) REFERENCES [Series] ([Id])
GO

ALTER TABLE [Books] ADD FOREIGN KEY ([PlatformId]) REFERENCES [Platforms] ([Id])
GO

ALTER TABLE [Movies] ADD FOREIGN KEY ([PlatformId]) REFERENCES [Platforms] ([Id])
GO

ALTER TABLE [Shows] ADD FOREIGN KEY ([PlatformId]) REFERENCES [Platforms] ([Id])
GO
