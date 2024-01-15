"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var axios = require("axios");
function hideHotelPopUp() {
    var updateFormDiv = document.getElementById("hotelFormDiv");
    updateFormDiv.style.visibility = "hidden";
}
function hideFlightPopUp() {
    var updateFormDiv = document.getElementById("flightFormDiv");
    updateFormDiv.style.visibility = "hidden";
}
document.addEventListener("DOMContentLoaded", function () {
    var token = localStorage.getItem("accessToken");
    // Make sure userId exists before sending the request
    if (token) {
        axios.default
            .get("http://localhost:8000/parseAccessToken/".concat(token))
            .then(function (response) {
            if (response.data.role === "admin") {
                var userId_1 = response.data.id;
                console.log(userId_1);
                axios.default
                    .get("http://localhost:8000/hotels/getHotelsById/".concat(userId_1))
                    .then(function (response) {
                    var responseCount = response.data.length;
                    if (responseCount === 0) {
                        console.log("this user doesn't have any data");
                        document.getElementById("total_hotel_number").textContent = "0";
                    }
                    else {
                        var divContainer_1 = document.querySelector(".userHotels");
                        document.getElementById("total_hotel_number").textContent =
                            responseCount;
                        response.data.forEach(function (item) {
                            var cardContainer = document.createElement("div");
                            cardContainer.setAttribute("class", "userHotelCard");
                            var imgContainer = document.createElement("div");
                            imgContainer.setAttribute("id", "adminDashboardHotelImg");
                            var hotelImg = document.createElement("img");
                            hotelImg.src = "../../images/hotels/".concat(item.image1);
                            imgContainer.appendChild(hotelImg);
                            var infoContainer = document.createElement("div");
                            infoContainer.setAttribute("id", "adminDashboardHotelInfo");
                            var itemElement1 = document.createElement("p");
                            itemElement1.setAttribute("id", "dashboard_hotel_name");
                            var itemElement2 = document.createElement("p");
                            itemElement2.setAttribute("id", "dashboard_location_name");
                            var itemElement3 = document.createElement("p");
                            itemElement3.setAttribute("id", "dashboard_contact_name");
                            var btnContainer = document.createElement("div");
                            btnContainer.setAttribute("id", "dashboard_btn");
                            var updateBtn = document.createElement("button");
                            var deleteBtn = document.createElement("button");
                            // Set the hotelId as a data attribute for each button
                            updateBtn.setAttribute("updateBtn", item.id);
                            deleteBtn.setAttribute("deleteBtn", item.id);
                            deleteBtn.setAttribute("id", "dashboard_deleteBtn");
                            itemElement1.textContent = "Hotel Name: ".concat(item.hotelname);
                            itemElement2.textContent = "Location: ".concat(item.location);
                            itemElement3.textContent = "Contact: ".concat(item.phoneno);
                            updateBtn.textContent = "Update";
                            deleteBtn.textContent = "Delete";
                            btnContainer.appendChild(updateBtn);
                            btnContainer.appendChild(deleteBtn);
                            infoContainer.appendChild(itemElement1);
                            infoContainer.appendChild(itemElement2);
                            infoContainer.appendChild(itemElement3);
                            infoContainer.appendChild(btnContainer);
                            cardContainer.appendChild(imgContainer);
                            cardContainer.appendChild(infoContainer);
                            divContainer_1.appendChild(cardContainer);
                            // Event listener for the update button
                            updateBtn.addEventListener("click", function () {
                                var hotelId = Number(this.getAttribute("updateBtn"));
                                console.log("Update clicked for hotelId:", hotelId);
                                var updateFormDiv = document.getElementById("hotelFormDiv");
                                var updateForm = document.getElementById("updateHotel");
                                updateFormDiv.style.visibility = "visible";
                                updateForm.style.opacity = "1";
                                try {
                                    var selectedItem_1 = response.data.find(function (item) { return item.id === hotelId; });
                                    document.getElementById("hotelname").value =
                                        selectedItem_1.hotelname;
                                    document.getElementById("location").value =
                                        selectedItem_1.location;
                                    document.getElementById("established").value =
                                        selectedItem_1.established;
                                    document.getElementById("singleroom").value =
                                        selectedItem_1.singlerooms;
                                    document.getElementById("singleroomrate").value =
                                        selectedItem_1.singleroomrate;
                                    document.getElementById("doubleroom").value =
                                        selectedItem_1.doublerooms;
                                    document.getElementById("doubleroomrate").value =
                                        selectedItem_1.doubleroomrate;
                                    document.getElementById("suite").value =
                                        selectedItem_1.suites;
                                    document.getElementById("suiterate").value =
                                        selectedItem_1.suiterate;
                                    document.getElementById("website").value =
                                        selectedItem_1.website;
                                    document.getElementById("email").value =
                                        selectedItem_1.email;
                                    document.getElementById("phoneno").value =
                                        selectedItem_1.phoneno;
                                    updateForm.addEventListener("submit", function (event) {
                                        var _a, _b;
                                        event.preventDefault(); // Prevent default form submission
                                        // Get form data
                                        var hotelname = document.getElementById("hotelname").value;
                                        var location = document.getElementById("location").value;
                                        var established = document.getElementById("established").value;
                                        var singleroom = document.getElementById("singleroom").value;
                                        var singleroomrate = document.getElementById("singleroomrate").value;
                                        var doubleroom = document.getElementById("doubleroom").value;
                                        var doubleroomrate = document.getElementById("doubleroomrate").value;
                                        var suite = document.getElementById("suite").value;
                                        var suiterate = document.getElementById("suiterate").value;
                                        var website = document.getElementById("website").value;
                                        var email = document.getElementById("email").value;
                                        var phoneno = document.getElementById("phoneno").value;
                                        var image1 = (_b = (_a = document.getElementById("image1")) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
                                        // FORM VALIDATION IS NEEDED
                                        var updatedHotelData = {
                                            userId: userId_1,
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
                                            createdat: selectedItem_1.createdat,
                                        };
                                        console.log(updatedHotelData);
                                        axios.default
                                            .post("http://localhost:8000/upload/hotel", updatedHotelData, {
                                            headers: {
                                                "Content-Type": "multipart/form-data",
                                            },
                                        })
                                            .then(function (response) {
                                            updatedHotelData.image1 = response.data.fileName;
                                            console.log(updatedHotelData);
                                            //         // Send form data using Axios
                                            axios.default
                                                .put("http://localhost:8000/hotels/update/".concat(hotelId), updatedHotelData)
                                                .then(function (response) {
                                                if (response.status === 200) {
                                                    updateFormDiv.style.visibility = "hidden";
                                                    updateForm.style.opacity = "0";
                                                    alert("Hotel updated successfully");
                                                    window.location.href =
                                                        "./adminDashBoard.html";
                                                }
                                            })
                                                .catch(function (error) {
                                                console.error("Error updating hotel:", error);
                                                alert(`Error updating: ${error.response.data.message}`);
                                            });
                                        })
                                            .catch(function (error) {
                                            alert("Please upload an image of the hotel");
                                            console.error(error);
                                        });
                                    });
                                }
                                catch (error) {
                                    updateFormDiv.style.visibility = "hidden";
                                    updateForm.style.opacity = "0";
                                    alert("Unauthorized request");
                                    window.location.href = "./adminDashBoard.html";
                                }
                            });
                            // Event listener for the delete button
                            deleteBtn.addEventListener("click", function () {
                                var hotelId = Number(this.getAttribute("deleteBtn"));
                                var hotelIds = [hotelId, userId_1];
                                var concatenatedIds = hotelIds.join(",");
                                axios.default
                                    .delete("http://localhost:8000/hotels/delete/".concat(concatenatedIds))
                                    .then(function (response) {
                                    if (response.status === 200) {
                                        alert("Hotel entry deleted successfully");
                                    }
                                    console.log("Hotel with ID ".concat(hotelId, " deleted successfully"));
                                    // this.parentNode.remove();
                                    window.location.href = "./adminDashBoard.html";
                                })
                                    .catch(function (error) {
                                    console.error("Error deleting hotel:", error);
                                    alert(`Error deleting hotel: ${error.response.data.message}`);
                                    window.location.href = "./adminDashBoard.html";
                                });
                            });
                        });
                    }
                })
                    .catch(function (error) {
                    console.log(error);
                });
                // TO GET ALL THE USER CREATED FLIGHTS
                axios.default
                    .get("http://localhost:8000/flights/getFlightsById/".concat(userId_1))
                    .then(function (response) {
                    var responseCount = response.data.length;
                    if (responseCount === 0) {
                        document.getElementById("total_flight_number").textContent =
                            "0";
                        // console.log("this user doesn't have any data");
                    }
                    else {
                        var divContainer_2 = document.querySelector(".userFlights");
                        document.getElementById("total_flight_number").textContent =
                            responseCount;
                        response.data.forEach(function (item) {
                            var cardContainer = document.createElement("div");
                            cardContainer.setAttribute("class", "userFlightCard");
                            var flightImgContainer = document.createElement("div");
                            flightImgContainer.setAttribute("id", "adminDashboardFlightImg");
                            var flightImg = document.createElement("img");
                            flightImg.src = "../../images/flights/".concat(item.image1);
                            flightImgContainer.appendChild(flightImg);
                            var flightInfoContainer = document.createElement("div");
                            flightInfoContainer.setAttribute("id", "adminDashboardFlightInfo");
                            var itemElement1 = document.createElement("p");
                            itemElement1.setAttribute("id", "dashboard_hotel_name");
                            var itemElement2 = document.createElement("div");
                            itemElement2.setAttribute("class", "userFlightCardFlight");
                            var itemElementfordept = document.createElement("div");
                            itemElementfordept.setAttribute("id", "dashboard_location_name");
                            var itemElement2Inner1 = document.createElement("span");
                            itemElement2Inner1.textContent = "Departure";
                            var imgElement = document.createElement("img");
                            imgElement.src =
                                "../../assets/img/dashboard_flight_journey.png";
                            var itemElementfordest = document.createElement("div");
                            itemElementfordest.setAttribute("id", "dashboard_location_name");
                            var itemElement2Inner2 = document.createElement("span");
                            itemElement2Inner2.textContent = "Destination";
                            var itemElement4 = document.createElement("p");
                            itemElement4.setAttribute("id", "dashboard_contact_name");
                            var btnContainer = document.createElement("div");
                            btnContainer.setAttribute("id", "dashboard_btn");
                            var updateBtn = document.createElement("button");
                            var deleteBtn = document.createElement("button");
                            // Set the hotelId as a data attribute for each button
                            updateBtn.setAttribute("updateBtn", item.id);
                            deleteBtn.setAttribute("deleteBtn", item.id);
                            deleteBtn.setAttribute("id", "dashboard_deleteBtn");
                            itemElement1.textContent = "Flight Name: ".concat(item.flightname);
                            itemElementfordept.textContent = "".concat(item.flightdepart);
                            itemElementfordest.textContent = "".concat(item.flightdest);
                            itemElement4.textContent = "Contact: ".concat(item.phoneno);
                            updateBtn.textContent = "Update";
                            deleteBtn.textContent = "Delete";
                            btnContainer.appendChild(updateBtn);
                            btnContainer.appendChild(deleteBtn);
                            itemElementfordept.append(itemElement2Inner1);
                            itemElementfordest.append(itemElement2Inner2);
                            itemElement2.append(itemElementfordept);
                            itemElement2.append(imgElement);
                            itemElement2.append(itemElementfordest);
                            flightInfoContainer.appendChild(itemElement1);
                            flightInfoContainer.appendChild(itemElement2);
                            flightInfoContainer.appendChild(itemElement4);
                            flightInfoContainer.appendChild(btnContainer);
                            cardContainer.appendChild(flightImgContainer);
                            cardContainer.appendChild(flightInfoContainer);
                            divContainer_2.appendChild(cardContainer);
                            // Event listener for the update button
                            updateBtn.addEventListener("click", function () {
                                var flightId = Number(this.getAttribute("updateBtn"));
                                console.log("Update clicked for flightId:", flightId);
                                var updateFormDiv = document.getElementById("flightFormDiv");
                                var updateForm = document.getElementById("updateFlight");
                                updateFormDiv.style.visibility = "visible";
                                updateForm.style.opacity = "1";
                                try {
                                    var selectedItem_2 = response.data.find(function (item) { return item.id === flightId; });
                                    document.getElementById("flightname").value =
                                        selectedItem_2.flightname;
                                    document.getElementById("flightdepart").value =
                                        selectedItem_2.flightdepart;
                                    document.getElementById("flightdest").value =
                                        selectedItem_2.flightdest;
                                    document.getElementById("economy").value =
                                        selectedItem_2.economy;
                                    document.getElementById("economyrate").value =
                                        selectedItem_2.economyrate;
                                    document.getElementById("business").value =
                                        selectedItem_2.business;
                                    document.getElementById("businessrate").value =
                                        selectedItem_2.businessrate;
                                    document.getElementById("flightwebsite").value =
                                        selectedItem_2.website;
                                    document.getElementById("flightemail").value =
                                        selectedItem_2.email;
                                    document.getElementById("flightphoneno").value =
                                        selectedItem_2.phoneno;
                                    updateForm.addEventListener("submit", function (event) {
                                        var _a, _b;
                                        event.preventDefault(); // Prevent default form submission
                                        // Get form data
                                        var flightname = document.getElementById("flightname").value;
                                        var flightdepart = document.getElementById("flightdepart").value;
                                        var flightdest = document.getElementById("flightdest").value;
                                        var economy = document.getElementById("economy").value;
                                        var economyrate = document.getElementById("economyrate").value;
                                        var business = document.getElementById("business").value;
                                        var businessrate = document.getElementById("businessrate").value;
                                        var website = document.getElementById("flightwebsite").value;
                                        var email = document.getElementById("flightemail").value;
                                        var phoneno = document.getElementById("flightphoneno").value;
                                        var image1 = (_b = (_a = document.getElementById("flightimage1")) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
                                        // FORM VALIDATION IS NEEDED
                                        var updatedFlightData = {
                                            userId: userId_1,
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
                                            createdat: selectedItem_2.createdat,
                                        };
                                        // console.log(formData);
                                        axios.default
                                            .post("http://localhost:8000/upload/flight", updatedFlightData, {
                                            headers: {
                                                "Content-Type": "multipart/form-data",
                                            },
                                        })
                                            .then(function (response) {
                                            updatedFlightData.image1 = response.data.fileName;
                                            // Send form data using Axios
                                            axios.default
                                                .put("http://localhost:8000/flights/update/".concat(flightId), updatedFlightData)
                                                .then(function (response) {
                                                if (response.status === 200) {
                                                    updateFormDiv.style.visibility = "hidden";
                                                    updateForm.style.opacity = "0";
                                                    alert("Flight updated successfully");
                                                    window.location.href =
                                                        "./adminDashBoard.html";
                                                }
                                            })
                                                .catch(function (error) {
                                                alert(`Error updating flights: ${error.response.data.message}`);
                                                console.error("Error updating flight:", error);
                                                // Handle error while trying to update the hotel
                                            });
                                        })
                                            .catch(function (error) {
                                            alert("Please upload an image of the flight");
                                            console.error(error);
                                        });
                                    });
                                }
                                catch (error) {
                                    updateFormDiv.style.visibility = "hidden";
                                    updateForm.style.opacity = "0";
                                    alert("Unauthorized request");
                                    window.location.href = "./adminDashBoard.html";
                                }
                            });
                            // Event listener for the delete button
                            deleteBtn.addEventListener("click", function () {
                                var flightId = Number(this.getAttribute("deleteBtn"));
                                var flightIds = [flightId, userId_1];
                                var concatenatedIds = flightIds.join(",");
                                axios.default
                                    .delete("http://localhost:8000/flights/delete/".concat(concatenatedIds))
                                    .then(function (response) {
                                    if (response.status === 200) {
                                        alert("Flight entry deleted successfully");
                                    }
                                    console.log("Flight with ID ".concat(flightId, " deleted successfully"));
                                    // this.parentNode.remove();
                                    window.location.href = "./adminDashBoard.html";
                                })
                                    .catch(function (error) {
                                    console.error("Error deleting flight:", error);
                                    alert(`Error deleting hotel: ${error.response.data.message}`);
                                    window.location.href = "./adminDashBoard.html";
                                });
                            });
                        });
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
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    else {
        localStorage.removeItem("accessToken");
        window.location.href = "../login.html";
    }
});
