/*
  Warnings:

  - Made the column `level` on table `LearningPath` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LearningPath" ALTER COLUMN "level" SET NOT NULL;
