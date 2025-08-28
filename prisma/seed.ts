import { PrismaClient, Status } from '@prisma/client'

const prisma = new PrismaClient()

const sampleJobs = [
  {
    company: 'Google',
    position: 'Frontend Developer',
    location: 'Mountain View, CA',
    salary: '$120,000 - $160,000',
    description: 'Work on cutting-edge web technologies and user interfaces for Google products.',
    status: 'INTERVIEW' as Status,
    notes: 'Technical interview scheduled for next week. Prepare system design questions.',
    appliedAt: new Date('2024-01-15')
  },
  {
    company: 'Meta',
    position: 'Full Stack Engineer',
    location: 'Menlo Park, CA',
    salary: '$130,000 - $180,000',
    description: 'Build and maintain scalable web applications used by billions of people.',
    status: 'SCREENING' as Status,
    notes: 'HR screening completed. Waiting for technical round.',
    appliedAt: new Date('2024-01-20')
  },
  {
    company: 'Microsoft',
    position: 'Software Engineer',
    location: 'Seattle, WA',
    salary: '$110,000 - $150,000',
    description: 'Develop cloud-based solutions and services for enterprise customers.',
    status: 'APPLIED' as Status,
    notes: 'Just submitted application via LinkedIn.',
    appliedAt: new Date('2024-01-25')
  },
  {
    company: 'Netflix',
    position: 'Senior React Developer',
    location: 'Los Gatos, CA',
    salary: '$140,000 - $190,000',
    description: 'Build user interfaces for Netflix streaming platform and internal tools.',
    status: 'OFFERED' as Status,
    notes: 'Received offer! Need to respond by end of week.',
    appliedAt: new Date('2024-01-10')
  },
  {
    company: 'Stripe',
    position: 'Backend Developer',
    location: 'San Francisco, CA',
    salary: '$125,000 - $170,000',
    description: 'Work on payment processing systems and financial infrastructure.',
    status: 'REJECTED' as Status,
    notes: 'Not selected after final interview. Good learning experience.',
    appliedAt: new Date('2024-01-05')
  },
  {
    company: 'Airbnb',
    position: 'Product Engineer',
    location: 'San Francisco, CA',
    salary: '$115,000 - $155,000',
    description: 'Build features for host and guest experiences on Airbnb platform.',
    status: 'INTERVIEW' as Status,
    notes: 'Onsite interview next Friday. Review system design and coding problems.',
    appliedAt: new Date('2024-01-18')
  },
  {
    company: 'Shopify',
    position: 'Frontend Engineer',
    location: 'Remote',
    salary: '$100,000 - $140,000',
    description: 'Develop merchant-facing tools and improve e-commerce experiences.',
    status: 'SCREENING' as Status,
    notes: 'Initial phone screen went well. Technical assessment in progress.',
    appliedAt: new Date('2024-01-22')
  },
  {
    company: 'Uber',
    position: 'Mobile Developer',
    location: 'San Francisco, CA',
    salary: '$120,000 - $165,000',
    description: 'Build and maintain iOS/Android applications for riders and drivers.',
    status: 'APPLIED' as Status,
    notes: 'Application submitted through company career page.',
    appliedAt: new Date('2024-01-28')
  },
  {
    company: 'Spotify',
    position: 'Full Stack Developer',
    location: 'New York, NY',
    salary: '$105,000 - $145,000',
    description: 'Work on music streaming features and artist tools.',
    status: 'ACCEPTED' as Status,
    notes: 'Accepted the offer! Starting next month.',
    appliedAt: new Date('2024-01-08')
  },
  {
    company: 'Twitch',
    position: 'Backend Engineer',
    location: 'San Francisco, CA',
    salary: '$118,000 - $158,000',
    description: 'Build scalable systems for live streaming and chat functionality.',
    status: 'INTERVIEW' as Status,
    notes: 'Second round interview tomorrow. Focus on distributed systems.',
    appliedAt: new Date('2024-01-12')
  },
  {
    company: 'Discord',
    position: 'Software Engineer',
    location: 'Remote',
    salary: '$110,000 - $150,000',
    description: 'Develop communication features and improve user experience.',
    status: 'APPLIED' as Status,
    notes: 'Heard back from recruiter. Phone screen scheduled.',
    appliedAt: new Date('2024-01-30')
  },
  {
    company: 'Figma',
    position: 'Frontend Developer',
    location: 'San Francisco, CA',
    salary: '$125,000 - $175,000',
    description: 'Build collaborative design tools and improve editor performance.',
    status: 'SCREENING' as Status,
    notes: 'Completed take-home assignment. Feedback was positive.',
    appliedAt: new Date('2024-01-17')
  }
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.job.deleteMany({})
  console.log('🗑️  Cleared existing jobs')

  // Create sample jobs
  for (const job of sampleJobs) {
    await prisma.job.create({
      data: job
    })
  }

  console.log(`✅ Successfully seeded ${sampleJobs.length} jobs`)

  // Show summary
  const jobCounts = await prisma.job.groupBy({
    by: ['status'],
    _count: {
      status: true
    }
  })

  console.log('\n📊 Job Status Summary:')
  jobCounts.forEach(({ status, _count }) => {
    console.log(`   ${status}: ${_count.status} jobs`)
  })
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })