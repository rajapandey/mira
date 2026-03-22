import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()

    // Create a test user
    const user = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: 'Test User',
        password: 'testpassword123'
      }
    })

    // Get all users
    const users = await prisma.user.findMany()

    // Clean up - delete the test user
    await prisma.user.delete({
      where: { id: user.id }
    })

    await prisma.$disconnect()

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: {
        totalUsers: users.length,
        testUserId: user.id,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Database test error:', error)

    try {
      await prisma.$disconnect()
    } catch { }

    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
