BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Section] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [order] INT,
    [isTitle] BIT NOT NULL CONSTRAINT [Section_isTitle_df] DEFAULT 0,
    [isHeader] BIT NOT NULL CONSTRAINT [Section_isHeader_df] DEFAULT 0,
    [isSubHeader] BIT NOT NULL CONSTRAINT [Section_isSubHeader_df] DEFAULT 0,
    [group] NVARCHAR(1000),
    CONSTRAINT [Section_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Section_name_key] UNIQUE NONCLUSTERED ([name])
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
