-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SEEKER', 'EMPLOYER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(150),
    "username" VARCHAR(200),
    "password" VARCHAR(1000),
    "phoneNumber" VARCHAR(50),
    "profileImageUrl" VARCHAR(2000),
    "role" "Role",
    "emailVerified" TIMESTAMP(3),
    "cvFileUrl" VARCHAR(2000),
    "organizationName" VARCHAR(300),
    "organizationLogoUrl" VARCHAR(2000),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "jobs" (
    "slug" VARCHAR(2000) NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "locationType" VARCHAR(50) NOT NULL,
    "location" VARCHAR(500),
    "description" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "companyName" VARCHAR(300) NOT NULL,
    "applicationEmail" VARCHAR(150),
    "applicationUrl" VARCHAR(2000),
    "companyLogoUrl" VARCHAR(2000),
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "applicaions" (
    "applicationId" INTEGER NOT NULL,
    "feedbackDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobSlug" VARCHAR(2000) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "applicaions_pkey" PRIMARY KEY ("applicationId")
);

-- CreateTable
CREATE TABLE "feedback" (
    "feedbackId" INTEGER NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "feedbackText" TEXT NOT NULL,
    "feedbackDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("feedbackId")
);

-- CreateTable
CREATE TABLE "assessments" (
    "slug" VARCHAR(2000) NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "duration" VARCHAR(500) NOT NULL,
    "endTime" TIMESTAMP(3),
    "description" TEXT,
    "companyName" VARCHAR(300) NOT NULL,
    "logoUrl" VARCHAR(2000),
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "score" INTEGER,
    "userId" TEXT,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "categories" (
    "categoryId" SERIAL NOT NULL,
    "naming" VARCHAR(100) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "skills" (
    "skillId" SERIAL NOT NULL,
    "skillName" VARCHAR(300) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("skillId")
);

-- CreateTable
CREATE TABLE "tasks" (
    "taskToken" VARCHAR(2000) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "taskFileUrl" VARCHAR(2000),
    "question" TEXT,
    "ponderation" INTEGER NOT NULL,
    "assessment_slug" VARCHAR(2000) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("taskToken")
);

-- CreateTable
CREATE TABLE "answers" (
    "answerId" SERIAL NOT NULL,
    "description" TEXT,
    "correct" BOOLEAN NOT NULL,
    "taskToken" VARCHAR(2000) NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("answerId")
);

-- CreateTable
CREATE TABLE "evaluations" (
    "resultId" SERIAL NOT NULL,
    "description" TEXT,
    "score" INTEGER NOT NULL,
    "assessmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assessmentSlug" VARCHAR(2000) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "evaluations_pkey" PRIMARY KEY ("resultId")
);

-- CreateTable
CREATE TABLE "_JobToSkill" (
    "A" VARCHAR(2000) NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AssessmentToSkill" (
    "A" VARCHAR(2000) NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SkillToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "feedback_applicationId_key" ON "feedback"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_naming_key" ON "categories"("naming");

-- CreateIndex
CREATE UNIQUE INDEX "skills_skillName_key" ON "skills"("skillName");

-- CreateIndex
CREATE UNIQUE INDEX "_JobToSkill_AB_unique" ON "_JobToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_JobToSkill_B_index" ON "_JobToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AssessmentToSkill_AB_unique" ON "_AssessmentToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_AssessmentToSkill_B_index" ON "_AssessmentToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SkillToUser_AB_unique" ON "_SkillToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SkillToUser_B_index" ON "_SkillToUser"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicaions" ADD CONSTRAINT "applicaions_jobSlug_fkey" FOREIGN KEY ("jobSlug") REFERENCES "jobs"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicaions" ADD CONSTRAINT "applicaions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applicaions"("applicationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assessment_slug_fkey" FOREIGN KEY ("assessment_slug") REFERENCES "assessments"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_taskToken_fkey" FOREIGN KEY ("taskToken") REFERENCES "tasks"("taskToken") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_assessmentSlug_fkey" FOREIGN KEY ("assessmentSlug") REFERENCES "assessments"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToSkill" ADD CONSTRAINT "_JobToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "jobs"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToSkill" ADD CONSTRAINT "_JobToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "skills"("skillId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssessmentToSkill" ADD CONSTRAINT "_AssessmentToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "assessments"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssessmentToSkill" ADD CONSTRAINT "_AssessmentToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "skills"("skillId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUser" ADD CONSTRAINT "_SkillToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "skills"("skillId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUser" ADD CONSTRAINT "_SkillToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
