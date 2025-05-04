# Link Processing Application

This is a web application for processing links. It allows users to submit URLs, which are stored in a PostgreSQL database, processed, and then returned with newly generated links.

## Features

- Submit URLs for processing
- Store original and generated links in PostgreSQL database
- Backend built with Node.js, Express, Prisma, and ZenStack
- Frontend built with React, TypeScript, and Tailwind CSS
- Form validation and error handling
- Responsive design for all device sizes

## Prerequisites

- Node.js (v16 or later)
- PostgreSQL database (configured on Neon.tech)

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Configure your environment:

Copy `.env.example` to `.env` and update with your database credentials:

```
DATABASE_URL="postgresql://username:password@your-neon-db-url.neon.tech/database_name?sslmode=require"
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Start the development servers:

```bash
npm run dev:all
```

This will start both the frontend and backend servers:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Project Structure

```
/
├── prisma/                # Prisma schema and migrations
├── public/                # Static assets
├── server/                # Backend Node.js server
│   ├── controllers/       # Request handlers
│   ├── lib/               # Server utilities
│   ├── routes/            # API routes
│   └── services/          # Business logic
├── src/                   # Frontend React application
│   ├── components/        # Reusable UI components
│   ├── lib/               # Frontend utilities
│   ├── pages/             # Application pages
│   └── main.tsx           # Entry point
└── package.json           # Project dependencies and scripts
```

## Customization

To connect to your own link processing system, modify the `generateNewLink` function in `server/services/linkService.ts`.

## Building for Production

```bash
npm run build              # Build frontend
npm run build:server       # Build backend
npm run start              # Start production server
```

## License

This project is licensed under the MIT License.