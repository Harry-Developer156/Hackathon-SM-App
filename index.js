// veriable declarations
let loginForm = document.getElementById("loginForm");
let usernameInput = document.getElementById("usernameInput");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let loginBtn = document.getElementById("loginBtn");

// Utility: Show error
function showError(input, message) {
    let errorText = input.parentElement.querySelector(".error-text");
    if (!errorText) {
        errorText = document.createElement("p");
        errorText.className = "error-text text-red-400 text-sm mt-1";
        input.parentElement.appendChild(errorText);
    }
    errorText.textContent = message;
}

// Utility: Clear error
function clearError(input) {
    let errorText = input.parentElement.querySelector(".error-text");
    if (errorText) errorText.remove();
}

// Email validation
function isValidEmail(email) {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Form submit event
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    // Username validation
    if (usernameInput.value.trim() === "") {
        showError(usernameInput, "Username is required.");
        valid = false;
    } else {
        clearError(usernameInput);
    }

    // Email validation
    if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, "Enter a valid email address.");
        valid = false;
    } else {
        clearError(emailInput);
    }

    // Password validation
    if (passwordInput.value.trim() === "") {
        showError(passwordInput, "Password is required.");
        valid = false;
    } else {
        clearError(passwordInput);
    }

    if (!valid) return;

    // Get stored user data from signup
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (!storedData) {
        alert("No user found. Please sign up first.");
        return;
    }

    // Check credentials
    if (
        usernameInput.value.trim() === storedData.username &&
        emailInput.value.trim() === storedData.email &&
        passwordInput.value.trim() === storedData.password
    ) {
        // Successful login → redirect
        alert(`Welcome, ${storedData.username}!`);
        window.location.href = "./application.html";
    } else {
        alert("Invalid credentials. Please check your username, email, and password.");
    }
});
