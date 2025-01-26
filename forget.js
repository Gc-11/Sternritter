document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("forgotPasswordForm").addEventListener("submit", function (event) {
        event.preventDefault(); 

        const email = document.getElementById("email").value;
        const forgotPasswordMessage = document.getElementById("forgotPasswordMessage");

       
        if (email) {
            forgotPasswordMessage.innerText = "A password reset link has been sent to " + email + ".";
           
        } else {
            forgotPasswordMessage.innerText = "Please enter your email.";
        }
    });
});
