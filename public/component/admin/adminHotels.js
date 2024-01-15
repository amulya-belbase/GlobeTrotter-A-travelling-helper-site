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
          .getElementById("addHotelsForm")
          .addEventListener("submit", function (event) {
            var _a, _b;
            event.preventDefault();
            // Get form data
            var hotelname = document.getElementById("hotelname").value;
            var location = document.getElementById("location").value;
            var established = document.getElementById("established").value;
            var singleroom = document.getElementById("singleroom").value;
            var singleroomrate =
              document.getElementById("singleroomrate").value;
            var doubleroom = document.getElementById("doubleroom").value;
            var doubleroomrate =
              document.getElementById("doubleroomrate").value;
            var suite = document.getElementById("suite").value;
            var suiterate = document.getElementById("suiterate").value;
            var website = document.getElementById("website").value;
            var email = document.getElementById("email").value;
            var phoneno = document.getElementById("phoneno").value;
            var image1 =
              (_b =
                (_a = document.getElementById("image1")) === null ||
                _a === void 0
                  ? void 0
                  : _a.files) === null || _b === void 0
                ? void 0
                : _b[0];
            // FORM VALIDATION IS NEEDED
            var formData = {
              userId: userId,
              hotelname: hotelname,
              location: location,
              established: established,
              singleroom: singleroom,
              singleroomrate: singleroomrate,
              doubleroom: doubleroom,
              doubleroomrate: doubleroomrate,
              suite: suite,
              suiterate: suiterate,
              website: website,
              email: email,
              phoneno: phoneno,
              image1: image1,
            };
            axios.default
              .post("http://localhost:8000/upload/hotel", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(function (response) {
                formData.image1 = response.data.fileName;
                axios.default
                  .post("http://localhost:8000/hotels/addNew", formData)
                  .then(function (response) {
                    // console.log(response.status);
                    if (response.status === 200) {
                      alert("Hotel registered successfully");
                      window.location.href = "./adminDashBoard.html";
                    }
                  })
                  .catch(function (error) {
                    alert(`Error updating: ${error.response.data.message}`);
                  });
              })
              .catch(function (error) {
                alert("Please Upload an image");
                console.error(error);
              });
          });
      } else {
        localStorage.removeItem("accessToken");
        window.location.href = "../login.html";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
} else {
  localStorage.removeItem("accessToken");
  window.location.href = "../login.html";
}
