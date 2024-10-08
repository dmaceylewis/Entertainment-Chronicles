USE [master]
GO
IF db_id('EChronicles') IS NULL
  CREATE DATABASE [EChronicles]
GO
USE [EChronicles]
GO

-- DROP TABLE IF NEEDED --
DROP TABLE IF EXISTS [Shows];
DROP TABLE IF EXISTS [Movies];
DROP TABLE IF EXISTS [Books];
DROP TABLE IF EXISTS [Series];
DROP TABLE IF EXISTS [Collections];
DROP TABLE IF EXISTS [Platforms];
DROP TABLE IF EXISTS [Season];
DROP TABLE IF EXISTS [Users];

-- CREATE TABLES --

CREATE TABLE [Users] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL
)

GO


CREATE TABLE [Collections] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] int NOT NULL,
  [Name] nvarchar(255) NOT NULL,

  -- CONSTRAINT [FK_Collections_Users] FOREIGN KEY ([userId]) REFERENCES [Users] ([id])
)

GO


CREATE TABLE [Series] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [CollectionId] int NOT NULL,

  -- CONSTRAINT [FK_Series_Collections] FOREIGN KEY ([collectionId]) REFERENCES [Collections] ([id])
)

GO


CREATE TABLE [Books] (
  [Id] int PRIMARY KEY IDENTITY,
  [Title] nvarchar(255) NOT NULL,
  [Author] nvarchar(255) NOT NULL,
  [Order] int NOT NULL,
  [Read] bit NOT NULL,
  [PlatformId] int NOT NULL,
  [SeriesId] int NOT NULL
)

GO

CREATE TABLE [Shows] (
  [Id] int PRIMARY KEY IDENTITY,
  [Title] nvarchar(255) NOT NULL,
  [Order] int NOT NULL,
  [Watched] bit NOT NULL,
  [SeasonId] int NOT NULL,
  [PlatformId] int NOT NULL,
  [SeriesId] int NOT NULL
)
GO

CREATE TABLE [Movies] (
  [Id] int PRIMARY KEY IDENTITY,
  [Title] nvarchar(255) NOT NULL,
  [Order] int NOT NULL,
  [Watched] bit NOT NULL,
  [PlatformId] int NOT NULL,
  [SeriesId] int NOT NULL
)
GO

CREATE TABLE [Season] (
  [Id] int PRIMARY KEY IDENTITY,
  [Number] int NOT NULL,
  [Episode] int NOT NULL
)
GO

CREATE TABLE [Platforms] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL
)
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