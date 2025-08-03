# 📊 Job Tracker Dashboard

### A modern, full-stack job application tracking system built with **Next.js 14**, **ShadCN UI**, and **PostgreSQL**. Track your job applications, manage interview statuses, and never lose sight of your career opportunities.

![Job Tracker Dashboard](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## ✨ Features

### 🎯 Core Functionality
- **📝 Add Job Applications** - Simple form to track new opportunities
- **📊 Status Management** - 6 comprehensive status levels
- **🔍 Smart Filtering** - Filter applications by status
- **⚡ Real-time Updates** - Instant status changes
- **🗑️ Safe Deletion** - Delete with confirmation dialog

### 🌟 Advanced Features
- **🌙 Dark Mode** - System-aware theme switching
- **📤 CSV Export** - Export filtered data to spreadsheet
- **📈 Statistics Dashboard** - Visual overview of application progress
- **📱 Responsive Design** - Perfect on desktop, tablet, and mobile
- **🔒 Type Safety** - Full TypeScript implementation

### 📋 Application Status Flow
```
Applied → Interview Scheduled → Interview Completed → Offer Received ✅
                                                   → Rejected ❌
                                                   → Withdrawn 🚫
```

## 🖼️ Screenshots

### 🌅 Light Mode Dashboard
Beautiful, clean interface with comprehensive job tracking capabilities.

### 🌙 Dark Mode Experience  
Eye-friendly dark theme that automatically adapts to your system preferences.

### 📊 Statistics Overview
Real-time insights into your job search progress with visual indicators.

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0 or higher
- **PostgreSQL** database
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/job-tracker-dashboard.git
   cd job-tracker-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your database configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/job_tracker"
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🔧 Additional Commands

```bash
# View database in browser
npx prisma studio

# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[ShadCN UI](https://ui.shadcn.com/)** - Beautiful component library

### Backend & Database
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[Prisma ORM](https://www.prisma.io/)** - Type-safe database toolkit
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Serverless API endpoints

### Additional Libraries
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[PapaParse](https://www.papaparse.com/)** - CSV processing
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[class-variance-authority](https://cva.style/)** - Component variants

## 📁 Project Structure

```
job-tracker-dashboard/
├── 📁 app/
│   ├── 📁 api/jobs/              # API endpoints
│   │   ├── route.ts              # GET & POST jobs
│   │   └── [id]/route.ts         # UPDATE & DELETE job
│   ├── globals.css               # Global styles & CSS variables
│   ├── layout.tsx                # Root layout with theme provider
│   └── page.tsx                  # Main dashboard page
├── 📁 components/
│   ├── 📁 ui/                    # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── ...
│   ├── job-form.tsx              # Add new job form
│   ├── job-list.tsx              # Job applications display
│   └── theme-provider.tsx        # Dark mode context
├── 📁 lib/
│   ├── db.ts                     # Prisma client instance
│   └── utils.ts                  # Utility functions
├── 📁 prisma/
│   └── schema.prisma             # Database schema
├── 📁 types/
│   └── index.ts                  # TypeScript type definitions
└── 📄 Configuration files
    ├── package.json
    ├── tailwind.config.js
    ├── tsconfig.json
    └── next.config.js
```

## 🗄️ Database Schema

```prisma
model Job {
  id          String    @id @default(cuid())
  company     String    // Company name (required)
  position    String    // Job position (required)
  location    String?   // Job location (optional)
  salary      String?   // Salary range (optional)
  status      JobStatus @default(APPLIED)
  appliedDate DateTime  @default(now())
  notes       String?   // Additional notes (optional)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum JobStatus {
  APPLIED                // Initial application submitted
  INTERVIEW_SCHEDULED    // Interview has been scheduled
  INTERVIEW_COMPLETED    // Interview process completed
  OFFER_RECEIVED         // Job offer received
  REJECTED               // Application rejected
  WITHDRAWN              // Application withdrawn
}
```

## 🎨 Design Philosophy

### User Experience First
- **Intuitive Interface** - Clean, modern design that's easy to navigate
- **Responsive Layout** - Seamless experience across all device sizes
- **Accessibility** - WCAG compliant with proper contrast and semantics
- **Performance** - Optimized loading and smooth interactions

### Visual Design
- **Consistent Spacing** - Harmonious layout with proper typography hierarchy
- **Color System** - Carefully chosen palette supporting both light and dark themes
- **Micro-interactions** - Subtle animations that enhance user feedback
- **Status Indicators** - Color-coded badges for quick status recognition

## 📊 Usage Guide

### Adding New Applications
1. Fill out the **Add New Job Application** form
2. **Company** and **Position** are required fields
3. **Location**, **Salary**, and **Notes** are optional
4. Applications start with "Applied" status automatically

### Managing Applications
- **Update Status**: Use the dropdown in each job card
- **Delete Applications**: Click the trash icon (confirmation required)
- **Filter View**: Use the status filter to focus on specific stages
- **Export Data**: Download your applications as CSV for external use

### Dashboard Statistics
- **Total Applications**: Overview of all submitted applications
- **Status Breakdown**: Visual distribution across different stages
- **Progress Tracking**: Monitor your job search momentum

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables
Set these in your deployment platform:
```env
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_URL="your-production-url"
NEXTAUTH_SECRET="your-secret-key"
```

### Database Setup for Production
```bash
npx prisma generate
npx prisma db push
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use TypeScript for type safety
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic

## 📈 Roadmap

### Upcoming Features
- [ ] **Email Notifications** - Interview reminders and status updates
- [ ] **Calendar Integration** - Sync interview dates with Google Calendar
- [ ] **Company Research** - Integrated company information and notes
- [ ] **Salary Analytics** - Market comparison and salary tracking
- [ ] **Application Templates** - Save and reuse cover letters
- [ ] **Timeline View** - Visual application journey
- [ ] **Mobile App** - React Native companion app
- [ ] **Team Collaboration** - Share progress with mentors/career coaches

### Technical Improvements
- [ ] **Real-time Sync** - WebSocket updates
- [ ] **Offline Support** - PWA capabilities
- [ ] **Advanced Filtering** - Date ranges, salary ranges, multiple criteria
- [ ] **Bulk Operations** - Mass status updates
- [ ] **Data Visualization** - Charts and graphs
- [ ] **Search Functionality** - Full-text search across applications

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[ShadCN](https://twitter.com/shadcn)** - For the amazing UI component library
- **[Vercel](https://vercel.com/)** - For the excellent deployment platform  
- **[Prisma Team](https://www.prisma.io/)** - For the fantastic ORM
- **[Next.js Team](https://nextjs.org/)** - For the powerful React framework


## <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="25px" alt="waving hand"> Get In Touch
<div align="center">
  <a href="https://www.instagram.com/corneliusyoga" target="_blank"><img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram"></a>&nbsp;
  <a href="https://www.linkedin.com/in/cornelius-yoga-783b6a291" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>&nbsp;
  <a href="https://www.youtube.com/channel/UCj0TlW5vLO6r_Nlwc8oFBpw" target="_blank"><img src="https://img.shields.io/badge/YouTube-%23FF0000.svg?&style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube"></a>&nbsp;
  <a href="https://czy.digital" target="_blank"><img src="https://img.shields.io/badge/Portfolio-%23000000.svg?&style=for-the-badge&logo=react&logoColor=white" alt="Portfolio"></a>
  <br/><br/>
  <img src="https://komarev.com/ghpvc/?username=CZY774&style=flat-square&color=0366D6" alt="Profile Views" />
  <br/>
  <sub>Made by Cornelius Ardhani Yoga Pratama</sub>
</div>
