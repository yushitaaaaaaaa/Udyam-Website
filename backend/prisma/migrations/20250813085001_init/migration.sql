-- CreateTable
CREATE TABLE "public"."udyam_form_data" (
    "id" SERIAL NOT NULL,
    "aadhaar_no" VARCHAR(12) NOT NULL,
    "entrepreneur_name" VARCHAR(255) NOT NULL,
    "otp" VARCHAR(6) NOT NULL,
    "org_type" VARCHAR(100) NOT NULL,
    "pan_number" VARCHAR(10) NOT NULL,
    "pan_holder_name" VARCHAR(255) NOT NULL,
    "dob" DATE NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "udyam_form_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "udyam_form_data_aadhaar_no_key" ON "public"."udyam_form_data"("aadhaar_no");

-- CreateIndex
CREATE UNIQUE INDEX "udyam_form_data_pan_number_key" ON "public"."udyam_form_data"("pan_number");
