# Contributing to Cline

Thank you for considering contributing to Cline! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Cfork.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Start the development server: `npm run dev`

## Development Workflow

### Code Style

- We use TypeScript for type safety
- Follow the existing code style
- Use ESLint: `npm run lint`
- Ensure your code passes type checking: `npx tsc --noEmit`

### Commit Messages

Follow conventional commit format:

```
feat: add new feature
fix: fix bug in task deletion
docs: update API documentation
style: format code
refactor: refactor task management
test: add tests for API routes
chore: update dependencies
```

### Pull Request Process

1. Ensure your code builds successfully: `npm run build`
2. Run linting: `npm run lint`
3. Update documentation if needed
4. Write clear commit messages
5. Create a pull request with a clear description
6. Wait for code review and address feedback

## Project Structure

```
Cfork/
├── app/                    # Next.js App Router
│   ├── api/               # Backend API routes
│   │   ├── health/        # Health check endpoint
│   │   ├── tasks/         # Task management
│   │   └── settings/      # Application settings
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                   # Utility libraries
│   ├── api-response.ts    # API response helpers
│   └── logger.ts          # Logging utility
└── middleware.ts          # Next.js middleware
```

## Adding New Features

### Adding a New API Endpoint

1. Create a new directory under `app/api/`
2. Create `route.ts` with HTTP method handlers
3. Use utility functions from `lib/api-response.ts`
4. Add proper error handling
5. Update API.md documentation
6. Test the endpoint manually

Example:
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    return successResponse({ users: [] });
  } catch (error) {
    return errorResponse("Failed to fetch users", error.message, 500);
  }
}
```

### Adding a New UI Component

1. Create components in the `app/` directory or create a `components/` directory
2. Use TypeScript for props
3. Follow responsive design principles
4. Use Tailwind CSS for styling
5. Ensure dark mode compatibility

Example:
```typescript
interface CardProps {
  title: string;
  description: string;
}

export function Card({ title, description }: CardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
```

## Testing

### Manual Testing

1. Start the development server: `npm run dev`
2. Test all functionality in the browser
3. Test API endpoints with curl or Postman
4. Check both light and dark modes
5. Test responsive design on different screen sizes

### API Testing Example

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test task creation
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Testing"}'
```

## Code Review Guidelines

When reviewing code, consider:

- **Functionality**: Does it work as expected?
- **Code Quality**: Is it clean, readable, and maintainable?
- **Performance**: Are there any performance concerns?
- **Security**: Are there any security issues?
- **Testing**: Is it properly tested?
- **Documentation**: Is it documented?

## Questions or Issues?

If you have questions or encounter issues:

1. Check existing issues on GitHub
2. Create a new issue with detailed information
3. Include steps to reproduce for bugs
4. Provide context for feature requests

## License

By contributing to Cline, you agree that your contributions will be licensed under the ISC License.

Thank you for contributing! 🎉
