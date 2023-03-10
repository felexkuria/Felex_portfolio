// Initialize Firebase


const firebaseConfig = {
    apiKey: "AIzaSyC9Tne9fcJZi8yz50q-wwosH83LlfhIus4",
    authDomain: "blue-b2e9c.firebaseapp.com",
    projectId: "blue-b2e9c",
    storageBucket: "blue-b2e9c.appspot.com",
    messagingSenderId: "19520597692",
    appId: "1:19520597692:web:0d600c97799dae36ae6ab9",
    measurementId: "G-TJ9H53VGN7"
  };

  const app = initializeApp(firebaseConfig);
  
const db = getFirestore(app);
  // Get a reference to the Firestore database
 // const db = firebase.firestore();
  
  // Get a reference to the to-do list element
  const todoList = document.getElementById('todo-list');
  
  // Listen for the form submission
  $('form').on('submit', function(e) {
    e.preventDefault();
  
    // Get the to-do value
    const todo = $('#todo').val();
  
    // Add the to-do to the Firestore database
    db.collection('todos').add({
      todo: todo
    })
    .then(function(docRef) {
      // Add the to-do to the list element
      todoList.innerHTML += `<li class="list-group-item">${todo}</li>`;
      
      // Clear the input field
      $('#todo').val('');
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  });
  
  // Listen for changes to the Firestore database
  db.collection('todos').onSnapshot(function(querySnapshot) {
    // Clear the list element
    todoList.innerHTML = '';
  
    // Loop through the documents in the Firestore database
    querySnapshot.forEach(function(doc) {
      // Get the to-do data
      const data = doc.data();
  
      // Add the to-do to the list element
      todoList.innerHTML += `<li class="list-group-item">${data.todo}</li>`;
    });
  });
  