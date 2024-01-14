"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var axios = require("axios");
document.getElementById('signUpForm').addEventListener('submit', function (event) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    event.preventDefault(); // Prevent default form submission
    // Get form data
    var email = ((_a = document.getElementById('email')) === null || _a === void 0 ? void 0 : _a.value) || '';
    var password = ((_b = document.getElementById('password')) === null || _b === void 0 ? void 0 : _b.value) || '';
    var firstname = ((_c = document.getElementById('firstname')) === null || _c === void 0 ? void 0 : _c.value) || '';
    var lastname = ((_d = document.getElementById('lastname')) === null || _d === void 0 ? void 0 : _d.value) || '';
    var dateofbirth = ((_e = document.getElementById('birthday')) === null || _e === void 0 ? void 0 : _e.value) || '';
    var gender = ((_f = document.getElementById('gender')) === null || _f === void 0 ? void 0 : _f.value) || '';
    var profilepicInput = document.getElementById('profilepic');
    var profilepic = ((_g = profilepicInput === null || profilepicInput === void 0 ? void 0 : profilepicInput.files) === null || _g === void 0 ? void 0 : _g[0]) || null;
    var role = ((_h = document.getElementById('role')) === null || _h === void 0 ? void 0 : _h.value) || '';
    // Get validation elements
    var emailValidation = document.getElementById("frontend_email_validation");
    var passwordValidation = document.getElementById("frontend_password_validation");
    var firstnameValidation = document.getElementById("frontend_firstname_validation");
    var lastnameValidation = document.getElementById("frontend_lastname_validation");
    var genderValidation = document.getElementById("frontend_gender_validation");
    var roleValidation = document.getElementById("frontend_role_validation");
    var birthdayValidation = document.getElementById("frontend_birthday_validation");
    if (password === '') {
        passwordValidation.style.display = 'block';
        passwordValidation.innerHTML = "Password is required";
        return;
    }
    else {
        passwordValidation.style.display = 'none';
    }
    if (firstname === '') {
        firstnameValidation.style.display = 'block';
        firstnameValidation.innerHTML = "Firstname is required";
        return;
    }
    else {
        firstnameValidation.style.display = 'none';
    }
    if (lastname === '') {
        lastnameValidation.style.display = 'block';
        lastnameValidation.innerHTML = "Lastname is required";
        return;
    }
    else {
        lastnameValidation.style.display = 'none';
    }
    if (gender === '#') {
        genderValidation.style.display = 'block';
        genderValidation.innerHTML = "Gender is required";
        return;
    }
    else {
        genderValidation.style.display = 'none';
    }
    if (role === '#') {
        roleValidation.style.display = 'block';
        roleValidation.innerHTML = "Role is required";
        return;
    }
    else {
        roleValidation.style.display = 'none';
    }
    if (dateofbirth === '') {
        birthdayValidation.style.display = 'block';
        birthdayValidation.innerHTML = "Date Of Birth is required";
        return;
    }
    else {
        birthdayValidation.style.display = 'none';
    }
    // Create a data object with form values
    var formData = {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        dateofbirth: dateofbirth,
        gender: gender,
        profilepic: profilepic,
        role: role
    };
    axios.default.post('http://localhost:8000/upload/user', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(function (response) {
        formData.profilepic = response.data.fileName;
        axios.default.post('http://localhost:8000/users/signup', formData)
            .then(function (response) {
            emailValidation.style.display = 'none';
            if (response.status === 200) {
                // console.log(response.data[0].id, response.data[0].firstname);
                alert("User registration successful");
                window.location.href = './login.html'; // Replace '/dashboard' with your desired page
            }
            else {
                console.log(response);
            }
        })
            .catch(function (error) {
            console.log(error.response.status);
            if (error.response.status === 422) {
                emailValidation.style.display = 'block';
                emailValidation.innerHTML = "User already exists";
                return;
            }
        });
    })
        .catch(function (error) {
        console.error(error);
    });
});
