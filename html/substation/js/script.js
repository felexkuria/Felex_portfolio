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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get the register form
const registerForm = document.getElementById("register-form");

// Add an event listener to the register form
registerForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get the user's email and password from the form
  const email = registerForm["email"].value;
  const password = registerForm["password"].value;

  // Create a new user with email and password

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User created
      const user = userCredential.user;
      console.log(`User created: ${user.uid}`);
      // Save the user's email to Firestore
      const db = firebase.firestore();
      db.collection("users")
        .doc(user.uid)
        .set({
          email: email,
          password: password,
          isAdmin: false,
        })
        .then(() => {
          console.log("User email saved to Firestore");
          // Redirect the user to the home page
          window.location.href = "substation.html";
        })
        .catch((error) => {
          console.error(`Error saving user email to Firestore: ${error}`);
        });
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error: ${errorCode} - ${errorMessage}`);
      alert("Registration failed");
    });
  // Check if the user is already signed in
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, redirect to home page
      window.location.href = "ajax_todolist.html";
    }
  });

  // AJAX Setup
  $.ajaxSetup({
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Submit the register form
  $("#register-form").submit((event) => {
    event.preventDefault(); // Prevent the default form submission
    const email = $("#email").val();
    const password = $("#password").val();
    const data = JSON.stringify({ email: email, password: password });
    $.ajax({
      type: "POST",
      url: "/register",
      data: data,
      success: (response) => {
        console.log(response);
        alert("Registration successful");
        window.location.href = "ajax_todolist";
      },
      error: (xhr) => {
        console.error(xhr.responseText);
        alert("Registration failed");
      },
    });
  });
});

// Get the login form
const loginForm = document.getElementById("login-form");

// Add an event listener to the login form
loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get the user's email and password from the form
  const email = loginForm["email"].value;
  const password = loginForm["password"].value;

  // Sign in with email and password
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed in
      const user = userCredential.user;
      console.log(`User signed in: ${user.uid}`);
      // Redirect the user to the home page
      window.location.href = "ajax_todolist.html";
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error: ${errorCode} - ${errorMessage}`);
      alert("Invalid email or password");
    });
});
