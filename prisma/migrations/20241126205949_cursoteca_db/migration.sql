-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DIRECTIVE', 'ADMIN', 'ENROLLED');

-- CreateEnum
CREATE TYPE "CATEGORIES_ENUM" AS ENUM ('ALL', 'LOGISTICS', 'PHARMACEUTICALS', 'OTHERS', 'NONE');

-- CreateEnum
CREATE TYPE "EDUCATIONAL_LEVELS_ENUM" AS ENUM ('NONE', 'PRIMARY', 'BASIC_CYCLE', 'SECONDARY', 'UNIVERSITY');

-- CreateEnum
CREATE TYPE "STATUS_ENUM" AS ENUM ('INTERVIEW', 'STAGE_1', 'STAGE_2', 'STAGE_3', 'APPROVED', 'NOT_APPROVED', 'ALTERNATE', 'NONE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "eca" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ENROLLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ecaId" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT NOT NULL DEFAULT 'NO_IMAGE',
    "category" "CATEGORIES_ENUM" NOT NULL DEFAULT 'NONE',
    "ageRange" INTEGER[] DEFAULT ARRAY[10, 20]::INTEGER[],
    "educationalLevel" "EDUCATIONAL_LEVELS_ENUM" NOT NULL DEFAULT 'NONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscriptions" (
    "id" TEXT NOT NULL,
    "firstNames" TEXT NOT NULL,
    "lastNames" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "eca" TEXT NOT NULL,
    "dateOfBorn" TIMESTAMP(3) NOT NULL,
    "province" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lastNameInstitution" TEXT NOT NULL,
    "educationalLevel" "EDUCATIONAL_LEVELS_ENUM" NOT NULL DEFAULT 'NONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "inscriptionId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "eca" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnrollmentStatus" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "status" "STATUS_ENUM" NOT NULL DEFAULT 'NONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnrollmentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Inscriptions_documentId_key" ON "Inscriptions"("documentId");

-- CreateIndex
CREATE INDEX "Enrollment_courseId_inscriptionId_idx" ON "Enrollment"("courseId", "inscriptionId");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_inscriptionId_fkey" FOREIGN KEY ("inscriptionId") REFERENCES "Inscriptions"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentStatus" ADD CONSTRAINT "EnrollmentStatus_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
