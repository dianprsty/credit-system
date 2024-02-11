-- CreateTable
CREATE TABLE "LoansImages" (
    "id" SERIAL NOT NULL,
    "image_ktp" BYTEA NOT NULL,
    "image_spk" BYTEA NOT NULL,
    "image_invoice" BYTEA NOT NULL,

    CONSTRAINT "LoansImages_pkey" PRIMARY KEY ("id")
);
