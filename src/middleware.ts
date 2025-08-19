import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/api/clerk-webhook',
    '/api/clerk-webhook-debug',
    '/api/test-webhook',
    '/api/webhook-status',
    '/api/create-user',
    '/api/test-create-user',
    '/api/health-check',
    '/api/drive-activity/notification',
    '/api/payment/success',
    '/api/test-db',
    '/api/test-user',
    '/api/webhook-test',
    '/api/simple-test',
  ],
  ignoredRoutes: [
    '/api/auth/callback/discord',
    '/api/auth/callback/notion',
    '/api/auth/callback/slack',
    '/api/flow',
    '/api/cron/wait',
  ],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

// https://www.googleapis.com/auth/userinfo.email
// https://www.googleapis.com/auth/userinfo.profile
// https://www.googleapis.com/auth/drive.activity.readonly
// https://www.googleapis.com/auth/drive.metadata
// https://www.googleapis.com/auth/drive.readonly
