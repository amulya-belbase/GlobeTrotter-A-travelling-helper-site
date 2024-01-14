"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var axios = require("axios");
document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
    var _a, _b;
    event.preventDefault(); // Prevent default form submission
    // Get form data
    var email = ((_a = document.getElementById("email")) === null || _a === void 0 ? void 0 : _a.value) || '';
    var password = ((_b = document.getElementById("password")) === null || _b === void 0 ? void 0 : _b.value) || '';
    var emailValidation = document.getElementById("frontend_email_validation");
    var passwordValidation = document.getElementById("frontend_password_validation");
    if (password === "") {
        passwordValidation.style.display = "block";
        passwordValidation.innerHTML = "Password is required";
        return;
    }
    else {
        passwordValidation.style.display = "none";
    }
    // Create a data object with form values
    var formData = {
        email: email,
        password: password,
    };
    // Send form data using Axios
    axios.default
        .post("http://localhost:8000/users/login", formData)
        .then(function (response) {
        emailValidation.style.display = "none";
        console.log(response.data.accessToken);
        localStorage.setItem("accessToken", response.data.accessToken);
        window.location.href = "/";
    })
        .catch(function (error) {
        console.log(error.response.status);
        if (error.response.status === 404) {
            emailValidation.style.display = "block";
            emailValidation.innerHTML = "Email doesn't exist";
            return;
        }
        else if (error.response.status === 401) {
            emailValidation.style.display = "block";
            emailValidation.innerHTML = "Invalid Credentials";
        }
    });
});
