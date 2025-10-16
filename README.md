# Cline - Full-Stack Next.js Application

A modern, full-stack web application built with Next.js 14+ using the App Router architecture. This project demonstrates a complete migration to Next.js with integrated frontend and backend layers.

![Homepage Screenshot](https://github.com/user-attachments/assets/16f2402f-485d-4810-bf4e-af28cb7beaea)

## 🚀 Features

- **Next.js 14+ App Router**: Modern React framework with server-side rendering
- **TypeScript**: Full type safety across the entire stack
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **RESTful API**: Built-in backend API routes with proper error handling
- **Responsive Design**: Mobile-first design with dark mode support
- **Task Management**: Create, read, and delete tasks with real-time updates
- **API Documentation**: Built-in API endpoint documentation

## 📋 Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/0x-m1cro/Cfork.git
cd Cfork
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Copy the example environment file:
```bash
cp .env.example .env.local
```

## 🚀 Getting Started

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

Build the application for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## 📁 Project Structure

```
Cfork/
├── app/                    # Next.js App Router directory
│   ├── api/               # Backend API routes
│   │   ├── health/        # Health check endpoint
│   │   ├── tasks/         # Task management endpoints
│   │   └── settings/      # Settings endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── lib/                   # Utility libraries
│   ├── api-response.ts    # API response helpers
│   └── logger.ts          # Logging utility
├── middleware.ts          # Next.js middleware (CORS, logging)
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json           # Project dependencies
```

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```
Returns the API health status and version.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-16T09:36:29.496Z",
  "version": "1.0.0"
}
```

### Tasks

#### Get All Tasks
```
GET /api/tasks
```
Fetch all tasks. Optionally filter by status using query parameter `?status=active`.

**Response:**
```json
{
  "success": true,
  "tasks": [
    {
      "id": "1",
      "title": "Welcome to Cline",
      "description": "This is a sample task",
      "status": "active",
      "createdAt": "2025-10-16T09:36:41.963Z",
      "updatedAt": "2025-10-16T09:36:41.963Z"
    }
  ],
  "total": 1
}
```

#### Create Task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task Description",
  "status": "active" // optional
}
```

**Response:**
```json
{
  "success": true,
  "task": {
    "id": "1760607413480",
    "title": "Task Title",
    "description": "Task Description",
    "status": "active",
    "createdAt": "2025-10-16T09:36:53.480Z",
    "updatedAt": "2025-10-16T09:36:53.480Z"
  },
  "message": "Task created successfully"
}
```

#### Update Task
```
PUT /api/tasks
Content-Type: application/json

{
  "id": "1",
  "title": "Updated Title",
  "description": "Updated Description",
  "status": "completed"
}
```

#### Delete Task
```
DELETE /api/tasks?id=1
```

**Response:**
```json
{
  "success": true,
  "task": { ... },
  "message": "Task deleted successfully"
}
```

### Settings

#### Get Settings
```
GET /api/settings
```

**Response:**
```json
{
  "success": true,
  "settings": {
    "appName": "Cline",
    "theme": "auto",
    "language": "en",
    "notificationsEnabled": true,
    "autoSave": true,
    "apiVersion": "1.0.0"
  }
}
```

#### Update Settings
```
POST /api/settings
Content-Type: application/json

{
  "theme": "dark",
  "notificationsEnabled": false
}
```

## 🧪 Testing the API

You can test the API endpoints using curl:

```bash
# Health check
curl http://localhost:3000/api/health

# Get all tasks
curl http://localhost:3000/api/tasks

# Create a new task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Testing the API"}'

# Delete a task
curl -X DELETE "http://localhost:3000/api/tasks?id=1"

# Get settings
curl http://localhost:3000/api/settings
```

## 🎨 UI Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Real-time Updates**: Tasks update immediately after creation or deletion
- **Error Handling**: User-friendly error messages for failed operations
- **Loading States**: Visual feedback during API calls

## 🔧 Environment Variables

Create a `.env.local` file in the root directory for custom configuration:

```env
# Application Configuration
NODE_ENV=development
PORT=3000

# API Configuration
API_VERSION=1.0.0

# Add your custom environment variables here
```

## 🏗️ Architecture

This application follows the Next.js App Router architecture:

- **Server Components**: Default for optimal performance
- **Client Components**: Used for interactive UI elements (marked with `"use client"`)
- **API Routes**: Server-side handlers in `app/api/*/route.ts`
- **Middleware**: Request logging and CORS handling
- **Type Safety**: Full TypeScript coverage

## 📝 Development Notes

### Data Persistence

Currently, the application uses in-memory storage for tasks and settings. In a production environment, you should:

1. Integrate a database (PostgreSQL, MongoDB, etc.)
2. Add authentication and authorization
3. Implement proper session management
4. Add data validation with libraries like Zod
5. Set up proper error tracking (Sentry, etc.)

### Code Style

The project uses:
- ESLint for code quality
- TypeScript for type safety
- Prettier-compatible formatting (via ESLint)

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

### Docker

You can also containerize the application:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t cline-app .
docker run -p 3000:3000 cline-app
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Inspired by the Cline repository

---

**Note**: This is a demonstration project showcasing full-stack Next.js architecture. For production use, implement proper authentication, database integration, and security measures.
