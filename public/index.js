"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// import axios from "axios";
// var axios = require("axios");
document.addEventListener("DOMContentLoaded", function () {
    var loginCheck = document.getElementById("userValidationDiv");
    var loginUser = document.getElementById("userValidation");
    var loginLink = document.getElementById("loginLink");
    var loginCheckDiv = document.querySelector(".upper_header_right_login");
    var userButtons = document.getElementById("userValidationDivDropdown");
    var loggedInProfilePic = document.querySelector(".upper_header_right_login_user");
    if (localStorage.getItem("accessToken")) {
        var accessToken = localStorage.getItem("accessToken");
        console.log("User has logged in");
        axios.default
            .get("http://localhost:8000/parseAccessToken/".concat(accessToken))
            .then(function (response) {
            loginLink.style.display = "none";
            loginCheck.style.display = "block";
            loginCheckDiv.style.padding = "5px";
            loginCheckDiv.style.gap = "0px";
            loginCheckDiv.style.backgroundColor = "#276ac1";
            loginCheckDiv.style.borderRadius = "5px";
            loginUser.innerHTML = "Welcome, ".concat(response.data.username);
            // Assuming loginCheck is a valid DOM element where you want to append the created node
            loggedInProfilePic.innerHTML = "";
            var profileImg = document.createElement("img");
            profileImg.src = "/images/users/".concat(response.data.profilepic);
            loggedInProfilePic.appendChild(profileImg);
            var logoutButton = document.createElement("button");
            logoutButton.textContent = "Logout";
            logoutButton.setAttribute("id", "logoutBtn");
            var hotelButton = document.createElement("button");
            var flightButton = document.createElement("button");
            var dashboardButton = document.createElement("button");
            if (response.data.role === "admin") {
                dashboardButton.textContent = "My Dashboard";
                hotelButton.textContent = "Add Hotels";
                flightButton.textContent = "Add Flights";
                dashboardButton.setAttribute("id", "adminDashBoardBtn");
                hotelButton.setAttribute("id", "addHotelBtn");
                flightButton.setAttribute("id", "addFlightBtn");
                userButtons.appendChild(dashboardButton);
                userButtons.appendChild(hotelButton);
                userButtons.appendChild(flightButton);
                userButtons.appendChild(logoutButton);
            }
            if (response.data.role === "traveller") {
                dashboardButton.textContent = "My Dashboard";
                hotelButton.textContent = "Book Hotels";
                flightButton.textContent = "Book Flights";
                dashboardButton.setAttribute("id", "userDashBoardBtn");
                hotelButton.setAttribute("id", "bookHotelBtn");
                flightButton.setAttribute("id", "bookFlightBtn");
                userButtons.appendChild(dashboardButton);
                userButtons.appendChild(hotelButton);
                userButtons.appendChild(flightButton);
                userButtons.appendChild(logoutButton);
            }
            if (document.getElementById("logoutBtn")) {
                document
                    .getElementById("logoutBtn")
                    .addEventListener("click", function (event) {
                    localStorage.removeItem("accessToken");
                    window.location.href = "/";
                });
            }
            // FOR ADMIN DROPDOWN BUTTONS
            if (document.getElementById("addHotelBtn")) {
                document
                    .getElementById("addHotelBtn")
                    .addEventListener("click", function (event) {
                    window.location.href = "./component/admin/adminHotels.html";
                });
            }
            if (document.getElementById("addFlightBtn")) {
                document
                    .getElementById("addFlightBtn")
                    .addEventListener("click", function (event) {
                    window.location.href = "./component/admin/adminFlights.html";
                });
            }
            if (document.getElementById("adminDashBoardBtn")) {
                document
                    .getElementById("adminDashBoardBtn")
                    .addEventListener("click", function (event) {
                    window.location.href = "./component/admin/adminDashBoard.html";
                });
            }
            // FOR USER DROPDOWN BUTTONS
            if (document.getElementById("bookHotelBtn")) {
                document
                    .getElementById("bookHotelBtn")
                    .addEventListener("click", function (event) {
                    window.location.href = "./component/user/userHotels.html";
                });
            }
            if (document.getElementById("bookFlightBtn")) {
                document
                    .getElementById("bookFlightBtn")
                    .addEventListener("click", function (event) {
                    window.location.href = "./component/user/userFlights.html";
                });
            }
            if (document.getElementById("userDashBoardBtn")) {
                document
                    .getElementById("userDashBoardBtn")
                    .addEventListener("click", function (event) {
                    window.location.href = "./component/user/userDashBoard.html";
                });
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    }
});
