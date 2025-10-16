/**
 * API Testing Script for Cline Application
 * Run with: node examples/api-test.js
 * Make sure the server is running: npm run dev
 */

const BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🚀 Testing Cline API Endpoints');
  console.log('===============================\n');

  try {
    // Test Health Endpoint
    console.log('📊 Testing Health Endpoint...');
    const health = await fetch(`${BASE_URL}/health`);
    const healthData = await health.json();
    console.log(JSON.stringify(healthData, null, 2));
    console.log('\n');

    // Test Get All Tasks
    console.log('📋 Testing Get All Tasks...');
    const tasks = await fetch(`${BASE_URL}/tasks`);
    const tasksData = await tasks.json();
    console.log(JSON.stringify(tasksData, null, 2));
    console.log('\n');

    // Test Create Task
    console.log('✏️  Testing Create Task...');
    const createResponse = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Task from JS Script',
        description: 'This task was created by the JavaScript test script'
      })
    });
    const newTask = await createResponse.json();
    console.log(JSON.stringify(newTask, null, 2));
    const taskId = newTask.task.id;
    console.log(`\nCreated task with ID: ${taskId}\n`);

    // Test Update Task
    console.log('✏️  Testing Update Task...');
    const updateResponse = await fetch(`${BASE_URL}/tasks`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: taskId,
        title: 'Updated Task Title',
        status: 'completed'
      })
    });
    const updatedTask = await updateResponse.json();
    console.log(JSON.stringify(updatedTask, null, 2));
    console.log('\n');

    // Test Get Tasks Again
    console.log('📋 Testing Get All Tasks Again...');
    const tasks2 = await fetch(`${BASE_URL}/tasks`);
    const tasksData2 = await tasks2.json();
    console.log(JSON.stringify(tasksData2, null, 2));
    console.log('\n');

    // Test Delete Task
    console.log('🗑️  Testing Delete Task...');
    const deleteResponse = await fetch(`${BASE_URL}/tasks?id=${taskId}`, {
      method: 'DELETE'
    });
    const deletedTask = await deleteResponse.json();
    console.log(JSON.stringify(deletedTask, null, 2));
    console.log('\n');

    // Test Settings
    console.log('⚙️  Testing Get Settings...');
    const settings = await fetch(`${BASE_URL}/settings`);
    const settingsData = await settings.json();
    console.log(JSON.stringify(settingsData, null, 2));
    console.log('\n');

    // Test Update Settings
    console.log('⚙️  Testing Update Settings...');
    const updateSettingsResponse = await fetch(`${BASE_URL}/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        theme: 'dark',
        notificationsEnabled: false
      })
    });
    const updatedSettings = await updateSettingsResponse.json();
    console.log(JSON.stringify(updatedSettings, null, 2));
    console.log('\n');

    console.log('✅ API Testing Complete!');
    console.log('===============================');

  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    console.error('\nMake sure the server is running: npm run dev');
    process.exit(1);
  }
}

// Run the tests
testAPI();
