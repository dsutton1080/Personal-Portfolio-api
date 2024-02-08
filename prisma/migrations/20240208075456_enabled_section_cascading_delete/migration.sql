BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Content] DROP CONSTRAINT [Content_section_id_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_section_id_fkey] FOREIGN KEY ([section_id]) REFERENCES [dbo].[Section]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
