BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Section] (
    [id] INT NOT NULL IDENTITY(1,1),
    [order] INT,
    [title] NVARCHAR(1000) NOT NULL CONSTRAINT [Section_title_df] DEFAULT 'New Section',
    [header] NVARCHAR(1000),
    [subHeader] NVARCHAR(1000),
    CONSTRAINT [Section_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Content] (
    [id] INT NOT NULL IDENTITY(1,1),
    [content] NVARCHAR(1000) NOT NULL,
    [order] INT,
    [section_id] INT NOT NULL,
    CONSTRAINT [Content_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_section_id_fkey] FOREIGN KEY ([section_id]) REFERENCES [dbo].[Section]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
