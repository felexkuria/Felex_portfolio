// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyC9Tne9fcJZi8yz50q-wwosH83LlfhIus4",
  authDomain: "blue-b2e9c.firebaseapp.com",
  projectId: "blue-b2e9c",
  storageBucket: "blue-b2e9c.appspot.com",
  messagingSenderId: "19520597692",
  appId: "1:19520597692:web:0d600c97799dae36ae6ab9",
  measurementId: "G-TJ9H53VGN7",
};
// // Initialize Firebase
// var firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };
firebase.initializeApp(firebaseConfig);

// Initialize Firestore database
var db = firebase.firestore();

// Load tasks from Firestore
function loadTasks() {
  db.collection("tasks")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var task = doc.data();
        task.id = doc.id;
        addTaskToList(task);
      });
    });
}

// Add task to Firestore
function addTask(task) {
  db.collection("tasks")
    .add(task)
    .then(function (docRef) {
      task.id = docRef.id;
      addTaskToList(task);
    });
}

// Update task in Firestore
function updateTask(task) {
  db.collection("tasks").doc(task.id).set(task);
  $("#task-" + task.id + " .task-title").text(task.title);
  $("#task-" + task.id + " .task-description").text(task.description);
  $("#task-" + task.id + " .task-due-date").text(task.dueDate);
}

// Delete task from Firestore
function deleteTask(taskId) {
  db.collection("tasks").doc(taskId).delete();
  $("#task-" + taskId).remove();
}

// Add task to list
function addTaskToList(task) {
  var taskHtml = `
    <li id="task-${task.id}" class="list-group-item">
      <div class="row">
        <div class="col-md-8">
          <h5 class="task-title">${task.title}</h5>
          <p class="task-description">${task.description}</p>
          <p class="task-due-date">${task.dueDate}</p>
        </div>
        <div class="col-md-4 text-right">
          <button class="btn btn-info" data-toggle="modal" data-target="#editTaskModal" data-id="${task.id}" data-title="${task.title}" data-description="${task.description}" data-due-date="${task.dueDate}">Edit</button>
          <button class="btn btn-danger ml-2" onclick="deleteTask('${task.id}')">Delete</button>
        </div>
      </div>
    </li>
  `;
  $("#taskList").append(taskHtml);
}

$(document).ready(function () {
  // Load tasks on page load
  loadTasks();

  // Add task button click event
  $("#addTaskButton").click(function () {
    var task = {
      title: $("#newTaskTitle").val(),
      description: $("#newTaskDescription").val(),
      dueDate: $("#newTaskDueDate").val(),
    };
    addTask(task);
    $("#newTaskTitle").val("");
    $("#newTaskDescription").val("");
    $("#newTaskDueDate").val("");
  });

  // Edit task button click event
  $("#editTaskModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var taskId = button.data("id");
    var taskTitle = button.data("title");
    var taskDescription = button.data("description");
    var taskDueDate = button.data("due-date");
    var modal = $(this);
    modal.find("#editTaskTitle").val(taskTitle);
    modal.find("#editTaskDescription").val(taskDescription);
    modal.find("#editTaskDueDate").val(taskDueDate);
    modal
      .find("#updateTaskButton")
      .off("click")
      .click(function () {
        var task = {
          id: taskId,
          title: modal.find("#editTaskTitle").val(),
          description: modal.find("#editTaskDescription").val(),
          dueDate: modal.find("#editTaskDueDate").val(),
        };
        updateTask(task);
        modal.modal("hide");
      });
  });
});
