BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Project] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL CONSTRAINT [Project_title_df] DEFAULT 'New Project',
    [content] NVARCHAR(1000) NOT NULL CONSTRAINT [Project_content_df] DEFAULT '',
    [repoLink] NVARCHAR(1000) NOT NULL CONSTRAINT [Project_repoLink_df] DEFAULT '',
    [repoLabel] NVARCHAR(1000) NOT NULL CONSTRAINT [Project_repoLabel_df] DEFAULT '',
    [order] INT,
    [imageUrl] NVARCHAR(1000),
    CONSTRAINT [Project_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
