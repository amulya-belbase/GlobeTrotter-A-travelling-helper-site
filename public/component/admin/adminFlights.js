"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var axios = require("axios");
var token = localStorage.getItem("accessToken");
if (token) {
    axios.default
        .get("http://localhost:8000/parseAccessToken/".concat(token))
        .then(function (response) {
        var role = response.data.role;
        var userId = response.data.id;
        if (role === "admin") {
            document
                .getElementById("addFlightsForm")
                .addEventListener("submit", function (event) {
                var _a, _b;
                event.preventDefault();
                // Get form data
                var flightname = document.getElementById("flightname").value;
                var flightdepart = document.getElementById("flightdepart").value;
                var flightdest = document.getElementById("flightdest").value;
                var economy = document.getElementById("economy").value;
                var economyrate = document.getElementById("economyrate").value;
                var business = document.getElementById("business").value;
                var businessrate = document.getElementById("businessrate").value;
                var website = document.getElementById("website").value;
                var email = document.getElementById("email").value;
                var phoneno = document.getElementById("phoneno").value;
                var image1 = (_b = (_a = document.getElementById("image1")) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
                // FORM VALIDATION IS NEEDED
                var formData = {
                    userId: userId,
                    flightname: flightname,
                    flightdepart: flightdepart,
                    flightdest: flightdest,
                    economy: economy,
                    economyrate: economyrate,
                    business: business,
                    businessrate: businessrate,
                    website: website,
                    email: email,
                    phoneno: phoneno,
                    image1: image1,
                };
                // console.log(formData);
                axios.default
                    .post("http://localhost:8000/upload/flight", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then(function (response) {
                    formData.image1 = response.data.fileName;
                    axios.default
                        .post("http://localhost:8000/flights/addNew", formData)
                        .then(function (response) {
                        // console.log(response.status);
                        if (response.status === 200) {
                            alert("Flight registered successfully");
                            window.location.href = "./adminDashBoard.html";
                        }
                    })
                        .catch(function (error) {
                            alert(`Error updating: ${error.response.data.message}`);
                        });
                })
                    .catch(function (error) {
                        alert("Please upload an image")
                    console.error(error);
                });
            });
        }
        else {
            localStorage.removeItem("accessToken");
            window.location.href = "../login.html";
        }
    })
        .catch(function (error) {
        console.log(error);
    });
}
else {
    localStorage.removeItem("accessToken");
    window.location.href = "../login.html";
}
