-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "alert100Sent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "alert90Sent" BOOLEAN NOT NULL DEFAULT false;
