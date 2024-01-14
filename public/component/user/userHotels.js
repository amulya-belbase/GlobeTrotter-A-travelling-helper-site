"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var axios = require("axios");
function hideHotelPopUp() {
    var bookFormDiv = document.getElementById("bookFormDiv");
    bookFormDiv.style.visibility = "hidden";
}
document.addEventListener("DOMContentLoaded", function () {
    var token = localStorage.getItem("accessToken");
    // Make sure userId exists before sending the request
    if (token) {
        var searchData = ["all", "all"];
        var concatenatedSearchData = searchData.join(",");
        axios.default
            .get("http://localhost:8000/hotels/getAllFilter/".concat(searchData))
            .then(function (response) {
            if (response.data.length === 0) {
                console.log("There aren't any hotels");
            }
            else {
                var divContainer_1 = document.querySelector(".allFlights");
                divContainer_1.innerHTML = "";
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
                    itemElement1.setAttribute("id", "userDashboard_flight_name");
                    var itemElement2 = document.createElement("p");
                    itemElement2.setAttribute("id", "userDashboard_flight_location");
                    var itemElement3 = document.createElement("p");
                    itemElement3.setAttribute("id", "userDashboard_flight_contact");
                    var bookBtn = document.createElement("button");
                    // Set the hotelId as a data attribute for each button
                    bookBtn.setAttribute("bookId", item.id);
                    bookBtn.setAttribute("id", "userDashboard_bookBtn");
                    itemElement1.textContent = "Hotel Name: ".concat(item.hotelname);
                    itemElement2.textContent = "Location: ".concat(item.location);
                    itemElement3.textContent = "Contact: ".concat(item.phoneno);
                    bookBtn.textContent = "Book Now";
                    infoContainer.appendChild(itemElement1);
                    infoContainer.appendChild(itemElement2);
                    infoContainer.appendChild(itemElement3);
                    infoContainer.appendChild(bookBtn);
                    cardContainer.appendChild(imgContainer);
                    cardContainer.appendChild(infoContainer);
                    divContainer_1.appendChild(cardContainer);
                    bookBtn.addEventListener("click", function () {
                        var bookId = Number(this.getAttribute("bookId"));
                        console.log("Book clicked for hotelId:", bookId);
                        var bookFormDiv = document.getElementById("bookFormDiv");
                        var bookForm = document.getElementById("bookHotel");
                        bookFormDiv.style.visibility = "visible";
                        bookForm.style.opacity = "1";
                        var selectedItem = response.data.find(function (item) { return item.id === bookId; });
                        document.getElementById("bookHotelName").value = selectedItem.hotelname;
                        document
                            .getElementById("bookRoomType")
                            .addEventListener("change", function () {
                            var selectedRoomType = this.value;
                            var roomRate = function () {
                                switch (selectedRoomType) {
                                    case "single":
                                        return selectedItem.singleroomrate;
                                    case "double":
                                        return selectedItem.doubleroomrate;
                                    case "suite":
                                        return selectedItem.suiterate;
                                }
                            };
                            document.getElementById("bookRoomRate").value = roomRate();
                        });
                        // SUBMIT THE FILLED HOTEL BOOKINGS FORM, CALL API ENDPOINT
                        document
                            .getElementById("bookHotel")
                            .addEventListener("submit", function (event) {
                            event.preventDefault(); // Prevent default form submission
                            // const hotelId = Number(this.getAttribute('bookid'));
                            // const userId = localStorage.getItem('userId');
                            var hotelname = document.getElementById("bookHotelName").value;
                            var arrivalDate = document.getElementById("bookArrivalDate").value;
                            var room_type = document.getElementById("bookRoomType").value;
                            var room_rate = document.getElementById("bookRoomRate").value;
                            var room_count = document.getElementById("bookRoomCount").value;
                            var formData = {
                                userId: token,
                                hotelId: bookId,
                                hotelname: hotelname,
                                arrivalDate: arrivalDate,
                                room_type: room_type,
                                room_rate: room_rate,
                                room_count: room_count,
                            };
                            axios.default
                                .post("http://localhost:8000/book/bookNewHotel", formData)
                                .then(function (response) {
                                if (response.status === 200) {
                                    // console.log(response.data[0].id, response.data[0].firstname);
                                    alert("Hotel booked successful");
                                    window.location.href = "./userDashBoard.html"; // Replace '/dashboard' with your desired page
                                }
                                else {
                                    console.log(response);
                                }
                            })
                                .catch(function (error) {
                                alert("Unauthorized Request. You should have a traveller's account to book Hotels");
                                localStorage.removeItem("accessToken");
                                window.location.href = "../login.html";
                                console.log(error.response.status);
                            });
                        });
                    });
                });
            }
        })
            .catch(function (error) {
            alert("There aren't any hotels");
            window.location.href = "./userHotels.html";
            console.log(error);
        });
        // for hotel filter
        document
            .getElementById("flight_filter")
            .addEventListener("submit", function (event) {
            event.preventDefault();
            var locationOption = document.getElementById("location_filter_option").value;
            var searchOption = document.getElementById("search_filter").value;
            var locationValue = locationOption === "#" ? "all" : locationOption.toLowerCase();
            var searchValue = searchOption === "" ? "all" : searchOption.toLowerCase();
            var searchData = [locationValue, searchValue];
            var concatenatedSearchData = searchData.join(",");
            // TO GET ALL THE USER CREATED HOTELS
            axios.default
                .get("http://localhost:8000/hotels/getAllFilter/".concat(searchData))
                .then(function (response) {
                if (response.data.length === 0) {
                    console.log("There aren't any hotels");
                }
                else {
                    var divContainer_2 = document.querySelector(".allFlights");
                    divContainer_2.innerHTML = "";
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
                        itemElement1.setAttribute("id", "userDashboard_flight_name");
                        var itemElement2 = document.createElement("p");
                        itemElement2.setAttribute("id", "userDashboard_flight_location");
                        var itemElement3 = document.createElement("p");
                        itemElement3.setAttribute("id", "userDashboard_flight_contact");
                        var bookBtn = document.createElement("button");
                        // Set the hotelId as a data attribute for each button
                        bookBtn.setAttribute("bookId", item.id);
                        bookBtn.setAttribute("id", "userDashboard_bookBtn");
                        itemElement1.textContent = "Hotel Name: ".concat(item.hotelname);
                        itemElement2.textContent = "Location: ".concat(item.location);
                        itemElement3.textContent = "Contact: ".concat(item.phoneno);
                        bookBtn.textContent = "Book Now";
                        infoContainer.appendChild(itemElement1);
                        infoContainer.appendChild(itemElement2);
                        infoContainer.appendChild(itemElement3);
                        infoContainer.appendChild(bookBtn);
                        cardContainer.appendChild(imgContainer);
                        cardContainer.appendChild(infoContainer);
                        divContainer_2.appendChild(cardContainer);
                        bookBtn.addEventListener("click", function () {
                            var bookId = Number(this.getAttribute("bookId"));
                            console.log("Book clicked for hotelId:", bookId);
                            var bookFormDiv = document.getElementById("bookFormDiv");
                            var bookForm = document.getElementById("bookHotel");
                            bookFormDiv.style.visibility = "visible";
                            bookForm.style.opacity = "1";
                            var selectedItem = response.data.find(function (item) { return item.id === bookId; });
                            document.getElementById("bookHotelName").value = selectedItem.hotelname;
                            document
                                .getElementById("bookRoomType")
                                .addEventListener("change", function () {
                                var selectedRoomType = this.value;
                                var roomRate = function () {
                                    switch (selectedRoomType) {
                                        case "single":
                                            return selectedItem.singleroomrate;
                                        case "double":
                                            return selectedItem.doubleroomrate;
                                        case "suite":
                                            return selectedItem.suiterate;
                                    }
                                };
                                document.getElementById("bookRoomRate").value = roomRate();
                            });
                            // SUBMIT THE FILLED HOTEL BOOKINGS FORM, CALL API ENDPOINT
                            document
                                .getElementById("bookHotel")
                                .addEventListener("submit", function (event) {
                                event.preventDefault(); // Prevent default form submission
                                // const hotelId = Number(this.getAttribute('bookid'));
                                var userId = localStorage.getItem("userId");
                                var hotelname = document.getElementById("bookHotelName").value;
                                var arrivalDate = document.getElementById("bookArrivalDate").value;
                                var room_type = document.getElementById("bookRoomType").value;
                                var room_rate = document.getElementById("bookRoomRate").value;
                                var room_count = document.getElementById("bookRoomCount").value;
                                var formData = {
                                    userId: token,
                                    hotelId: bookId,
                                    hotelname: hotelname,
                                    arrivalDate: arrivalDate,
                                    room_type: room_type,
                                    room_rate: room_rate,
                                    room_count: room_count,
                                };
                                axios.default
                                    .post("http://localhost:8000/book/bookNewHotel", formData)
                                    .then(function (response) {
                                    if (response.status === 200) {
                                        // console.log(response.data[0].id, response.data[0].firstname);
                                        alert("Hotel booked successful");
                                        window.location.href = "./userDashBoard.html"; // Replace '/dashboard' with your desired page
                                    }
                                    else {
                                        console.log(response);
                                    }
                                })
                                    .catch(function (error) {
                                    alert("Unauthorized Request. You should have a traveller's account to book Hotels");
                                    localStorage.removeItem("accessToken");
                                    window.location.href = "../login.html";
                                    console.log(error.response.status);
                                    console.log(error.response.status);
                                });
                            });
                        });
                    });
                }
            })
                .catch(function (error) {
                alert("There aren't any hotels");
                window.location.href = "./userHotels.html";
                console.log(error);
            });
        });
    }
    else {
        localStorage.removeItem("accessToken");
        window.location.href = "../login.html";
    }
});
