const BASE_URL = "http://localhost:5000/api/v1";

// REGISTER
async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.message || "Registered successfully");
}

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    alert("Login successful");
    window.location.href = "dashboard.html";
  } else {
    alert(data.message || "Login failed");
  }
}
const BASE_URL = "http://localhost:5000/api/v1";

function getToken() {
  return localStorage.getItem("token");
}
async function createTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
    body: JSON.stringify({ title, description })
  });

  const data = await res.json();

  alert("Task Created");

  loadTasks(); // refresh list
}
async function loadTasks() {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + getToken()
    }
  });

  const tasks = await res.json();

  const container = document.getElementById("taskList");
  container.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.description}</p>
      <button onclick="deleteTask('${task._id}')">Delete</button>
      <hr>
    `;

    container.appendChild(div);
  });
}
async function deleteTask(id) {
  await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + getToken()
    }
  });

  loadTasks(); // refresh list
}
window.onload = function () {
  loadTasks();
};
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}async function updateTask(id, oldTitle, oldDesc) {
  const title = prompt("Edit Title", oldTitle);
  const description = prompt("Edit Description", oldDesc);

  if (!title || !description) return;

  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
    body: JSON.stringify({ title, description })
  });

  const data = await res.json();

  alert("Task Updated");

  loadTasks();
}
div.innerHTML = `
  <h4>${task.title}</h4>
  <p>${task.description}</p>

  <button onclick="updateTask('${task._id}', '${task.title}', '${task.description}')">
    Edit
  </button>

  <button onclick="deleteTask('${task._id}')">
    Delete
  </button>

  <hr>
`;tasks.forEach(task => {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>

    <button class="btn-edit"
      onclick="updateTask('${task._id}', '${task.title}', '${task.description}')">
      Edit
    </button>

    <button class="btn-danger"
      onclick="deleteTask('${task._id}')">
      Delete
    </button>
  `;

  container.appendChild(div);
});
if (tasks.length === 0) {
  container.innerHTML = "<p>No tasks found. Add one 🚀</p>";
  return;
}
// instead of alert("Task Created")
console.log("Task created successfully");