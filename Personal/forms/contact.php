<?php
// Replace with your actual email address
$to_email = "engineerfelex@gmail.com";

// Get the form fields and sanitize them
$name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
$subject = filter_var($_POST["subject"], FILTER_SANITIZE_STRING);
$message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);

// Set the email headers
$headers = "From: $name <$email>" . "\r\n" .
           "Reply-To: $email" . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

// Send the email
if (mail($to_email, $subject, $message, $headers)) {
    // If the email was sent successfully, show a success message
    echo "<div class='alert alert-success'>Your message has been sent. Thank you!</div>";
} else {
    // If there was an error sending the email, show an error message
    echo "<div class='alert alert-danger'>Sorry, there was an error sending your message. Please try again later.</div>";
}
?>
