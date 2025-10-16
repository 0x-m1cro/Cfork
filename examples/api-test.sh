#!/bin/bash

# API Testing Script for Cline Application
# Make sure the server is running: npm run dev

BASE_URL="http://localhost:3000/api"

echo "🚀 Testing Cline API Endpoints"
echo "==============================="
echo ""

# Test Health Endpoint
echo "📊 Testing Health Endpoint..."
echo "GET $BASE_URL/health"
curl -s "$BASE_URL/health" | python3 -m json.tool
echo ""
echo ""

# Test Get All Tasks
echo "📋 Testing Get All Tasks..."
echo "GET $BASE_URL/tasks"
curl -s "$BASE_URL/tasks" | python3 -m json.tool
echo ""
echo ""

# Test Create Task
echo "✏️  Testing Create Task..."
echo "POST $BASE_URL/tasks"
NEW_TASK=$(curl -s -X POST "$BASE_URL/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task from Script",
    "description": "This task was created by the test script"
  }')
echo "$NEW_TASK" | python3 -m json.tool
TASK_ID=$(echo "$NEW_TASK" | python3 -c "import sys, json; print(json.load(sys.stdin)['task']['id'])")
echo ""
echo "Created task with ID: $TASK_ID"
echo ""
echo ""

# Test Get Tasks Again (should include new task)
echo "📋 Testing Get All Tasks Again..."
echo "GET $BASE_URL/tasks"
curl -s "$BASE_URL/tasks" | python3 -m json.tool
echo ""
echo ""

# Test Update Task
echo "✏️  Testing Update Task..."
echo "PUT $BASE_URL/tasks"
curl -s -X PUT "$BASE_URL/tasks" \
  -H "Content-Type: application/json" \
  -d "{
    \"id\": \"$TASK_ID\",
    \"title\": \"Updated Task Title\",
    \"status\": \"completed\"
  }" | python3 -m json.tool
echo ""
echo ""

# Test Delete Task
echo "🗑️  Testing Delete Task..."
echo "DELETE $BASE_URL/tasks?id=$TASK_ID"
curl -s -X DELETE "$BASE_URL/tasks?id=$TASK_ID" | python3 -m json.tool
echo ""
echo ""

# Test Settings
echo "⚙️  Testing Get Settings..."
echo "GET $BASE_URL/settings"
curl -s "$BASE_URL/settings" | python3 -m json.tool
echo ""
echo ""

# Test Update Settings
echo "⚙️  Testing Update Settings..."
echo "POST $BASE_URL/settings"
curl -s -X POST "$BASE_URL/settings" \
  -H "Content-Type: application/json" \
  -d '{
    "theme": "dark",
    "notificationsEnabled": false
  }' | python3 -m json.tool
echo ""
echo ""

# Test Get Settings Again
echo "⚙️  Testing Get Settings Again..."
echo "GET $BASE_URL/settings"
curl -s "$BASE_URL/settings" | python3 -m json.tool
echo ""
echo ""

echo "✅ API Testing Complete!"
echo "==============================="
