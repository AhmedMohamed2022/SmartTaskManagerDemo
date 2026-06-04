const API_BASE = window.location.origin;
// const API_BASE = "http://localhost:5000";

const statusElement = document.getElementById("status");

function showMessage(message, isSuccess = true) {
  statusElement.textContent = message;

  statusElement.className = isSuccess ? "success" : "error";
}

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/
async function registerUser() {
  try {
    const username = document.getElementById("username").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const securityNote = document.getElementById("securityNote").value;

    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        email,
        password,
        securityNote,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return showMessage(data.message, false);
    }

    showMessage("Registration successful");
  } catch (error) {
    console.error(error);

    showMessage("Registration failed", false);
  }
}

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/
async function loginUser() {
  try {
    console.log("Login button clicked");
    const email = document.getElementById("loginEmail").value;

    const password = document.getElementById("loginPassword").value;

    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Response:", data);

    if (!response.ok) {
      return showMessage(data.message, false);
    }

    document.getElementById("taskSection").classList.remove("hidden");

    showMessage("Login successful");

    loadTasks();
  } catch (error) {
    console.error(error);
    alert(error.message);

    showMessage("Login failed", false);
  }
}

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/
async function logoutUser() {
  try {
    await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",

      credentials: "include",
    });

    document.getElementById("taskSection").classList.add("hidden");

    document.getElementById("taskList").innerHTML = "";

    showMessage("Logged out successfully");
  } catch (error) {
    console.error(error);

    showMessage("Logout failed", false);
  }
}

/*
|--------------------------------------------------------------------------
| Create Task
|--------------------------------------------------------------------------
*/
async function createTask() {
  try {
    const title = document.getElementById("taskTitle").value;

    const response = await fetch(`${API_BASE}/api/tasks`, {
      method: "POST",

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return showMessage(data.message, false);
    }

    document.getElementById("taskTitle").value = "";

    showMessage("Task created successfully");

    loadTasks();
  } catch (error) {
    console.error(error);

    showMessage("Task creation failed", false);
  }
}

/*
|--------------------------------------------------------------------------
| Load Tasks
|--------------------------------------------------------------------------
*/
async function loadTasks() {
  try {
    const response = await fetch(`${API_BASE}/api/tasks`, {
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return;
    }

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    data.tasks.forEach((task) => {
      const item = document.createElement("li");

      item.className = "task-item";

      item.innerHTML = `
                <span>${task.title}</span>

                <button
                    class="delete-btn"
                    onclick="deleteTask('${task._id}')">
                    Delete
                </button>
            `;

      taskList.appendChild(item);
    });
  } catch (error) {
    console.error(error);
  }
}

/*
|--------------------------------------------------------------------------
| Delete Task
|--------------------------------------------------------------------------
*/
async function deleteTask(taskId) {
  try {
    const response = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
      method: "DELETE",

      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return showMessage(data.message, false);
    }

    showMessage("Task deleted successfully");

    loadTasks();
  } catch (error) {
    console.error(error);

    showMessage("Delete failed", false);
  }
}
