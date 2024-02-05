BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Experience] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL CONSTRAINT [Experience_title_df] DEFAULT 'New Experience',
    [content] NVARCHAR(1000) NOT NULL CONSTRAINT [Experience_content_df] DEFAULT '',
    [date] NVARCHAR(1000) NOT NULL CONSTRAINT [Experience_date_df] DEFAULT '',
    CONSTRAINT [Experience_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AboutMe] (
    [id] INT NOT NULL IDENTITY(1,1),
    [emailLink] NVARCHAR(1000) NOT NULL CONSTRAINT [AboutMe_emailLink_df] DEFAULT 'dsutton1080@gmail.com',
    [linkedInLink] NVARCHAR(1000) NOT NULL CONSTRAINT [AboutMe_linkedInLink_df] DEFAULT '',
    [githubLink] NVARCHAR(1000) NOT NULL CONSTRAINT [AboutMe_githubLink_df] DEFAULT '',
    [contentOne] NVARCHAR(1000) NOT NULL CONSTRAINT [AboutMe_contentOne_df] DEFAULT '',
    [contentTwo] NVARCHAR(1000) NOT NULL CONSTRAINT [AboutMe_contentTwo_df] DEFAULT '',
    [contentThree] NVARCHAR(1000) NOT NULL CONSTRAINT [AboutMe_contentThree_df] DEFAULT '',
    [contentFour] NVARCHAR(1000) NOT NULL CONSTRAINT [AboutMe_contentFour_df] DEFAULT '',
    [contentFive] NVARCHAR(1000) NOT NULL CONSTRAINT [AboutMe_contentFive_df] DEFAULT '',
    CONSTRAINT [AboutMe_pkey] PRIMARY KEY CLUSTERED ([id])
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
