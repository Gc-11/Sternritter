document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signupForm").addEventListener("submit", function (event) {
        event.preventDefault(); 

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const signupMessage = document.getElementById("signupMessage");

        if (name && email && password) {
            signupMessage.innerText = "Sign up successful! Welcome, " + name + "!";
        } else {
            signupMessage.innerText = "Please fill in all fields.";
        }
    });
});
