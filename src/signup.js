// Variable Declaration
let form = document.querySelector("form");
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");
let terms = document.getElementById("terms");

// Utility: Show Error
function showError(input, message) {
    let errorText = input.parentElement.querySelector(".error-text");

    if (!errorText) {
        errorText = document.createElement("p");
        errorText.className = "error-text text-red-400 text-sm mt-1";
        input.parentElement.appendChild(errorText);
    }

    errorText.textContent = message;
}

// Utility: Remove Error
function clearError(input) {
    let errorText = input.parentElement.querySelector(".error-text");
    if (errorText) errorText.remove();
}

// Email Validation Pattern
function isValidEmail(email) {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// FORM SUBMIT EVENT
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop default submission

    let valid = true;

    // Username Validation
    if (username.value.trim().length < 5) {
        showError(username, "Username must be at least 5 characters long.");
        valid = false;
    } else {
        clearError(username);
    }

    // Email Validation
    if (!isValidEmail(email.value.trim())) {
        showError(email, "Enter a valid email address.");
        valid = false;
    } else {
        clearError(email);
    }

    // Password Validation
    if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters long.");
        valid = false;
    } else {
        clearError(password);
    }

    // Confirm Password Validation
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match.");
        valid = false;
    } else {
        clearError(confirmPassword);
    }

    // Save user data in localStorage as per assignment if all valid
    let userData = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    // Redirect to login page
    window.location.href = "./login.html";
});
