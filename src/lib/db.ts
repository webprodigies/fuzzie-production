import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const createPrismaClient = () => {
  return new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })
}

export const db = globalThis.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db
}

// Ensure database is connected
export const ensureDbConnection = async () => {
  try {
    await db.$connect()
    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    // Don't throw error, just log it
  }
}

// Test database connection
export const testDbConnection = async () => {
  try {
    await db.$connect()
    const result = await db.$queryRaw`SELECT 1`
    console.log('✅ Database connection test successful')
    return true
  } catch (error) {
    console.error('❌ Database connection test failed:', error)
    return false
  }
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await db.$disconnect()
})