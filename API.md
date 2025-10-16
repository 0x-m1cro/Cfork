# API Documentation

## Base URL

```
http://localhost:3000/api
```

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Endpoints

### 1. Health Check

Check the API's health status.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-16T09:36:29.496Z",
  "version": "1.0.0"
}
```

**Status Codes:**
- `200`: API is healthy

---

### 2. Tasks API

#### 2.1 Get All Tasks

Retrieve all tasks with optional filtering.

**Endpoint:** `GET /api/tasks`

**Query Parameters:**
- `status` (optional): Filter tasks by status (e.g., "active", "completed")

**Example Request:**
```bash
curl http://localhost:3000/api/tasks
curl http://localhost:3000/api/tasks?status=active
```

**Response:**
```json
{
  "success": true,
  "tasks": [
    {
      "id": "1",
      "title": "Welcome to Cline",
      "description": "This is a sample task to demonstrate the API functionality",
      "status": "active",
      "createdAt": "2025-10-16T09:36:41.963Z",
      "updatedAt": "2025-10-16T09:36:41.963Z"
    }
  ],
  "total": 1
}
```

**Status Codes:**
- `200`: Success
- `500`: Server error

---

#### 2.2 Create Task

Create a new task.

**Endpoint:** `POST /api/tasks`

**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "active"  // optional, defaults to "active"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description"
  }'
```

**Response:**
```json
{
  "success": true,
  "task": {
    "id": "1760607413480",
    "title": "New Task",
    "description": "Task description",
    "status": "active",
    "createdAt": "2025-10-16T09:36:53.480Z",
    "updatedAt": "2025-10-16T09:36:53.480Z"
  },
  "message": "Task created successfully"
}
```

**Status Codes:**
- `201`: Task created successfully
- `400`: Missing required fields
- `500`: Server error

**Validation:**
- `title`: Required, must be a non-empty string
- `description`: Required, must be a non-empty string
- `status`: Optional, string

---

#### 2.3 Update Task

Update an existing task.

**Endpoint:** `PUT /api/tasks`

**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "id": "1",
  "title": "Updated Title",        // optional
  "description": "Updated Desc",   // optional
  "status": "completed"            // optional
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "id": "1",
    "title": "Updated Task Title",
    "status": "completed"
  }'
```

**Response:**
```json
{
  "success": true,
  "task": {
    "id": "1",
    "title": "Updated Task Title",
    "description": "Original description",
    "status": "completed",
    "createdAt": "2025-10-16T09:36:41.963Z",
    "updatedAt": "2025-10-16T09:45:30.123Z"
  },
  "message": "Task updated successfully"
}
```

**Status Codes:**
- `200`: Task updated successfully
- `400`: Missing task ID
- `404`: Task not found
- `500`: Server error

---

#### 2.4 Delete Task

Delete a task by ID.

**Endpoint:** `DELETE /api/tasks`

**Query Parameters:**
- `id` (required): The ID of the task to delete

**Example Request:**
```bash
curl -X DELETE "http://localhost:3000/api/tasks?id=1"
```

**Response:**
```json
{
  "success": true,
  "task": {
    "id": "1",
    "title": "Deleted Task",
    "description": "This task was deleted",
    "status": "active",
    "createdAt": "2025-10-16T09:36:41.963Z",
    "updatedAt": "2025-10-16T09:36:41.963Z"
  },
  "message": "Task deleted successfully"
}
```

**Status Codes:**
- `200`: Task deleted successfully
- `400`: Missing task ID
- `404`: Task not found
- `500`: Server error

---

### 3. Settings API

#### 3.1 Get Settings

Retrieve application settings.

**Endpoint:** `GET /api/settings`

**Example Request:**
```bash
curl http://localhost:3000/api/settings
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

**Status Codes:**
- `200`: Success
- `500`: Server error

---

#### 3.2 Update Settings

Update application settings.

**Endpoint:** `POST /api/settings`

**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "theme": "dark",
  "notificationsEnabled": false,
  "language": "es"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/settings \
  -H "Content-Type: application/json" \
  -d '{
    "theme": "dark",
    "notificationsEnabled": false
  }'
```

**Response:**
```json
{
  "success": true,
  "settings": {
    "appName": "Cline",
    "theme": "dark",
    "language": "en",
    "notificationsEnabled": false,
    "autoSave": true,
    "apiVersion": "1.0.0"
  },
  "message": "Settings updated successfully"
}
```

**Status Codes:**
- `200`: Settings updated successfully
- `500`: Server error

---

## Error Handling

All endpoints include comprehensive error handling:

### Common Error Responses

#### 400 Bad Request
```json
{
  "success": false,
  "error": "Missing required fields",
  "message": "Title and description are required"
}
```

#### 404 Not Found
```json
{
  "success": false,
  "error": "Task not found",
  "message": "Task with ID 123 does not exist"
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to fetch tasks",
  "message": "Database connection failed"
}
```

## Rate Limiting

Currently, there are no rate limits implemented. In production, consider adding rate limiting middleware to prevent abuse.

## Authentication

This API currently does not require authentication. For production use, implement:
- JWT tokens
- API keys
- OAuth 2.0
- Session-based authentication

## CORS

CORS is enabled for all origins in development. Update the middleware for production:

```typescript
response.headers.set("Access-Control-Allow-Origin", "https://yourdomain.com");
```

## Data Persistence

**Note:** The current implementation uses in-memory storage. Data will be lost when the server restarts.

For production, integrate a database:
- PostgreSQL with Prisma
- MongoDB with Mongoose
- Supabase
- Firebase

## Testing Examples

### Using JavaScript/Fetch

```javascript
// Get all tasks
const tasks = await fetch('http://localhost:3000/api/tasks')
  .then(res => res.json());

// Create a task
const newTask = await fetch('http://localhost:3000/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Task',
    description: 'Task description'
  })
}).then(res => res.json());

// Delete a task
await fetch('http://localhost:3000/api/tasks?id=1', {
  method: 'DELETE'
});
```

### Using Python/Requests

```python
import requests

# Get all tasks
response = requests.get('http://localhost:3000/api/tasks')
tasks = response.json()

# Create a task
response = requests.post(
    'http://localhost:3000/api/tasks',
    json={
        'title': 'New Task',
        'description': 'Task description'
    }
)
new_task = response.json()

# Delete a task
response = requests.delete('http://localhost:3000/api/tasks?id=1')
```

## Changelog

### Version 1.0.0
- Initial API implementation
- Task management endpoints
- Settings endpoint
- Health check endpoint
- Error handling and validation
- CORS support
