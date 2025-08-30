# Job Tracker Dashboard

A modern job application tracking dashboard built with Next.js, ShadCN UI, Prisma, and PostgreSQL.

## Features

- ✅ Add new job applications
- ✅ Track interview status with visual status badges
- ✅ Filter jobs by status (Applied, Screening, Interview, etc.)
- ✅ Edit and delete job applications
- ✅ Dark/Light mode toggle
- ✅ Export data to CSV
- ✅ Responsive design

## Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript
- **UI**: ShadCN UI + Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS v4

## Getting Started

### 1. Clone and Install Dependencies

```bash
git clone <your-repo>
cd job-tracker-dashboard
npm install
```

### 2. Database Setup

1. Create a PostgreSQL database
2. Copy `.env.local` and update the `DATABASE_URL`:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/job_tracker"
```

### 3. Initialize ShadCN UI

```bash
npx shadcn@latest init
```

Choose these options when prompted:
- Would you like to use TypeScript? → Yes
- Which style would you like to use? → Default
- Which color would you like to use as base color? → Slate
- Where is your global CSS file? → src/app/globals.css
- Would you like to use CSS variables for colors? → Yes
- Where is your tailwind.config.js located? → tailwind.config.js (skip if using v4)
- Configure the import alias for components? → src/components
- Configure the import alias for utils? → src/lib/utils

### 4. Add ShadCN Components

```bash
npx shadcn@latest add button card input label select textarea badge dialog dropdown-menu
```

### 5. Setup Prisma

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Optional: Open Prisma Studio to view data
npx prisma studio
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your job tracker dashboard.

## Usage

### Adding Jobs
- Click "Add Job" button
- Fill in company, position (required fields)
- Optionally add location, salary, description, and notes

### Tracking Status
- Edit any job to update its status
- Status options: Applied, Screening, Interview, Offered, Accepted, Rejected
- Status badges have different colors for easy visual identification

### Filtering
- Use the status filter dropdown to view jobs by specific status
- Select "All Status" to view all jobs

### Exporting Data
- Click "Export CSV" to download all your job applications
- Includes all fields: company, position, location, salary, status, applied date, and notes

## Database Schema

```prisma
model Job {
  id          String   @id @default(cuid())
  company     String
  position    String
  location    String?
  salary      String?
  description String?
  status      Status   @default(APPLIED)
  appliedAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  notes       String?
}

enum Status {
  APPLIED
  SCREENING
  INTERVIEW
  REJECTED
  OFFERED
  ACCEPTED
}
```

## API Routes

- `GET /api/jobs` - Fetch all jobs (with optional status filter)
- `POST /api/jobs` - Create new job
- `PUT /api/jobs` - Update existing job
- `DELETE /api/jobs` - Delete job
- `GET /api/export` - Export jobs to CSV

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT