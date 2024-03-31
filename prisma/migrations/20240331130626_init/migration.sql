-- CreateEnum
CREATE TYPE "CostType" AS ENUM ('Basic', 'Knowledge', 'Tools', 'Workflow');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "profileImage" TEXT,
    "tier" TEXT DEFAULT 'Free',
    "credits" TEXT DEFAULT '10',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "localGoogleId" TEXT,
    "googleResourceId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalGoogleCredential" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "folderId" TEXT,
    "pageToken" TEXT,
    "channelId" TEXT NOT NULL,
    "subscribed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LocalGoogleCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordWebhook" (
    "id" TEXT NOT NULL,
    "webhookId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guildName" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DiscordWebhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slack" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "authedUserId" TEXT NOT NULL,
    "authedUserToken" TEXT NOT NULL,
    "slackAccessToken" TEXT NOT NULL,
    "botUserId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Slack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notion" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "databaseId" TEXT NOT NULL,
    "workspaceName" TEXT NOT NULL,
    "workspaceIcon" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connections" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "discordWebhookId" TEXT,
    "notionId" TEXT,
    "userId" TEXT,
    "slackId" TEXT,

    CONSTRAINT "Connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workflows" (
    "id" TEXT NOT NULL,
    "nodes" TEXT,
    "edges" TEXT,
    "name" TEXT NOT NULL,
    "discordTemplate" TEXT,
    "notionTemplate" TEXT,
    "slackTemplate" TEXT,
    "slackChannels" TEXT[],
    "slackAccessToken" TEXT,
    "notionAccessToken" TEXT,
    "notionDbId" TEXT,
    "flowPath" TEXT,
    "cronPath" TEXT,
    "publish" BOOLEAN DEFAULT false,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dify" (
    "id" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "language" TEXT,
    "copyright" TEXT,
    "privacyPolicy" TEXT,
    "image" TEXT,
    "speech" BOOLEAN NOT NULL DEFAULT false,
    "multimodal" BOOLEAN NOT NULL DEFAULT false,
    "costType" "CostType"[],

    CONSTRAINT "Dify_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDify" (
    "userId" INTEGER NOT NULL,
    "difyId" TEXT NOT NULL,

    CONSTRAINT "UserDify_pkey" PRIMARY KEY ("userId","difyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_localGoogleId_key" ON "User"("localGoogleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleResourceId_key" ON "User"("googleResourceId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalGoogleCredential_accessToken_key" ON "LocalGoogleCredential"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "LocalGoogleCredential_channelId_key" ON "LocalGoogleCredential"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalGoogleCredential_userId_key" ON "LocalGoogleCredential"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordWebhook_webhookId_key" ON "DiscordWebhook"("webhookId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordWebhook_url_key" ON "DiscordWebhook"("url");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordWebhook_channelId_key" ON "DiscordWebhook"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "Slack_authedUserToken_key" ON "Slack"("authedUserToken");

-- CreateIndex
CREATE UNIQUE INDEX "Slack_slackAccessToken_key" ON "Slack"("slackAccessToken");

-- CreateIndex
CREATE UNIQUE INDEX "Notion_accessToken_key" ON "Notion"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "Notion_workspaceId_key" ON "Notion"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Notion_databaseId_key" ON "Notion"("databaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Connections_type_key" ON "Connections"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Dify_apiKey_key" ON "Dify"("apiKey");

-- AddForeignKey
ALTER TABLE "LocalGoogleCredential" ADD CONSTRAINT "LocalGoogleCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscordWebhook" ADD CONSTRAINT "DiscordWebhook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slack" ADD CONSTRAINT "Slack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notion" ADD CONSTRAINT "Notion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_discordWebhookId_fkey" FOREIGN KEY ("discordWebhookId") REFERENCES "DiscordWebhook"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_notionId_fkey" FOREIGN KEY ("notionId") REFERENCES "Notion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_slackId_fkey" FOREIGN KEY ("slackId") REFERENCES "Slack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workflows" ADD CONSTRAINT "Workflows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDify" ADD CONSTRAINT "UserDify_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDify" ADD CONSTRAINT "UserDify_difyId_fkey" FOREIGN KEY ("difyId") REFERENCES "Dify"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
