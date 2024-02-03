/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Post] DROP CONSTRAINT [Post_authorId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Profile] DROP CONSTRAINT [Profile_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [name];
ALTER TABLE [dbo].[User] ADD [firstName] NVARCHAR(1000),
[isAdmin] BIT NOT NULL CONSTRAINT [User_isAdmin_df] DEFAULT 1,
[lastName] NVARCHAR(1000),
[password] NVARCHAR(1000) NOT NULL CONSTRAINT [User_password_df] DEFAULT '';

-- DropTable
DROP TABLE [dbo].[Post];

-- DropTable
DROP TABLE [dbo].[Profile];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
