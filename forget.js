document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("forgotPasswordForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("email").value;
        const forgotPasswordMessage = document.getElementById("forgotPasswordMessage");

        // Basic validation (you can add more complex validation as needed)
        if (email) {
            forgotPasswordMessage.innerText = "A password reset link has been sent to " + email + ".";
            // Here you can add code to send the email to your server for processing
        } else {
            forgotPasswordMessage.innerText = "Please enter your email.";
        }
    });
});
