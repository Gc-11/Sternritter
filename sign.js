document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signupForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const signupMessage = document.getElementById("signupMessage");

        // Basic validation (you can add more complex validation as needed)
        if (name && email && password) {
            signupMessage.innerText = "Sign up successful! Welcome, " + name + "!";
            // Here you can add code to send the data to your server
        } else {
            signupMessage.innerText = "Please fill in all fields.";
        }
    });
});
