# API Testing Examples

This directory contains example scripts for testing the Cline API.

## Prerequisites

Make sure the development server is running:
```bash
npm run dev
```

## Available Scripts

### Bash Script (`api-test.sh`)

Tests all API endpoints using curl.

**Requirements:**
- bash
- curl
- python3 (for JSON formatting)

**Usage:**
```bash
chmod +x examples/api-test.sh
./examples/api-test.sh
```

### JavaScript Script (`api-test.js`)

Tests all API endpoints using Node.js fetch API.

**Requirements:**
- Node.js 18+ (with built-in fetch)

**Usage:**
```bash
node examples/api-test.js
```

## What Gets Tested

Both scripts test the following:

1. ✅ Health check endpoint
2. ✅ Get all tasks
3. ✅ Create a new task
4. ✅ Update a task
5. ✅ Get tasks (with new task)
6. ✅ Delete a task
7. ✅ Get application settings
8. ✅ Update settings

## Example Output

```
🚀 Testing Cline API Endpoints
===============================

📊 Testing Health Endpoint...
{
  "status": "healthy",
  "timestamp": "2025-10-16T09:36:29.496Z",
  "version": "1.0.0"
}

📋 Testing Get All Tasks...
{
  "success": true,
  "tasks": [...],
  "total": 1
}

...
```

## Manual Testing

You can also test individual endpoints:

```bash
# Health check
curl http://localhost:3000/api/health

# Get tasks
curl http://localhost:3000/api/tasks

# Create task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Task description"}'

# Update task
curl -X PUT http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"id":"1","title":"Updated Title","status":"completed"}'

# Delete task
curl -X DELETE "http://localhost:3000/api/tasks?id=1"

# Get settings
curl http://localhost:3000/api/settings

# Update settings
curl -X POST http://localhost:3000/api/settings \
  -H "Content-Type: application/json" \
  -d '{"theme":"dark","notificationsEnabled":false}'
```

## Testing with Postman or Insomnia

Import the endpoints into Postman or Insomnia:
- Base URL: `http://localhost:3000/api`
- Endpoints: `/health`, `/tasks`, `/settings`
- Methods: GET, POST, PUT, DELETE

## Troubleshooting

**Server not running:**
```bash
npm run dev
```

**Port already in use:**
- Stop other processes using port 3000
- Or change the port in package.json

**Connection refused:**
- Ensure the server started successfully
- Check for any build errors
