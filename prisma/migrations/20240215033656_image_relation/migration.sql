/*
  Warnings:

  - A unique constraint covering the columns `[loanImagesId]` on the table `Loan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `LoanImages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `loanImagesId` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LoanPdfSigned_loanId_key";

-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "loanImagesId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Loan_loanImagesId_key" ON "Loan"("loanImagesId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanImages_id_key" ON "LoanImages"("id");

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_loanImagesId_fkey" FOREIGN KEY ("loanImagesId") REFERENCES "LoanImages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
