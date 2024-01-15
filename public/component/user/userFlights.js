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
        var searchData = ["all", "all", "all"];
        var concatenatedSearchData = searchData.join(",");
        axios.default
            .get("http://localhost:8000/flights/getAllFilter/".concat(searchData))
            .then(function (response) {
            var divContainer = document.querySelector(".allHotels");
            divContainer.innerHTML = "";
            response.data.forEach(function (item) {
                var cardContainer = document.createElement("div");
                cardContainer.setAttribute("class", "userFlightCard");
                var imgContainer = document.createElement("div");
                imgContainer.setAttribute("id", "adminDashboardFlightImg");
                var imgFlight = document.createElement("img");
                imgFlight.src = "../../images/flights/".concat(item.image1);
                imgContainer.appendChild(imgFlight);
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
                imgElement.src = "../../assets/img/dashboard_flight_journey.png";
                var itemElementfordest = document.createElement("div");
                itemElementfordest.setAttribute("id", "dashboard_location_name");
                var itemElement2Inner2 = document.createElement("span");
                itemElement2Inner2.textContent = "Destination";
                var itemElement4 = document.createElement("p");
                itemElement4.setAttribute("id", "dashboard_contact_name");
                var bookBtn = document.createElement("button");
                // Set the hotelId as a data attribute for each button
                bookBtn.setAttribute("flightId", item.id);
                itemElement1.textContent = "Flight Name: ".concat(item.flightname);
                itemElementfordept.textContent = "".concat(item.flightdepart);
                itemElementfordest.textContent = "".concat(item.flightdest);
                itemElement4.textContent = "Contact: ".concat(item.phoneno);
                bookBtn.textContent = "Book Now";
                itemElementfordept.append(itemElement2Inner1);
                itemElementfordest.append(itemElement2Inner2);
                itemElement2.append(itemElementfordept);
                itemElement2.append(imgElement);
                itemElement2.append(itemElementfordest);
                flightInfoContainer.appendChild(itemElement1);
                flightInfoContainer.appendChild(itemElement2);
                flightInfoContainer.appendChild(itemElement4);
                flightInfoContainer.appendChild(bookBtn);
                cardContainer.appendChild(imgContainer);
                cardContainer.appendChild(flightInfoContainer);
                divContainer.appendChild(cardContainer);
                bookBtn.addEventListener("click", function () {
                    var bookId = Number(this.getAttribute("flightId"));
                    console.log("Book clicked for flightId:", bookId);
                    var bookFormDiv = document.getElementById("bookFormDiv");
                    var bookForm = document.getElementById("bookFlight");
                    bookFormDiv.style.visibility = "visible";
                    bookForm.style.opacity = "1";
                    var selectedItem = response.data.find(function (item) { return item.id === bookId; });
                    document.getElementById("bookFlightName").value = selectedItem.flightname;
                    document
                        .getElementById("bookSeatType")
                        .addEventListener("change", function () {
                        var selectedSeatType = this.value;
                        var seatRate = function () {
                            switch (selectedSeatType) {
                                case "economy":
                                    return selectedItem.economyrate;
                                case "business":
                                    return selectedItem.businessrate;
                            }
                        };
                        document.getElementById("bookSeatRate").value = seatRate();
                    });
                    // SUBMIT THE FILLED HOTEL BOOKINGS FORM, CALL API ENDPOINT
                    document
                        .getElementById("bookFlight")
                        .addEventListener("submit", function (event) {
                        event.preventDefault();
                        // const hotelId = Number(this.getAttribute('bookid'));
                        var flightname = document.getElementById("bookFlightName").value;
                        var departureDate = document.getElementById("bookDeptDate").value;
                        var seat_type = document.getElementById("bookSeatType").value;
                        var seat_rate = document.getElementById("bookSeatRate").value;
                        var seat_count = document.getElementById("bookSeatCount").value;
                        var formData = {
                            userId: token,
                            flightId: bookId,
                            flightname: flightname,
                            departureDate: departureDate,
                            seat_type: seat_type,
                            seat_rate: seat_rate,
                            seat_count: seat_count,
                        };
                        // console.log(formData);
                        axios.default
                            .post("http://localhost:8000/book/bookNewFlight", formData)
                            .then(function (response) {
                            if (response.status === 200) {
                                // console.log(response.data[0].id, response.data[0].firstname);
                                alert("Flight booked successful");
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
        })
            .catch(function (error) {
                alert("There aren't any hotels")
            console.log(error);
        });
        document
            .getElementById("flight_filter")
            .addEventListener("submit", function (event) {
            event.preventDefault();
            var deptOption = document.getElementById("flight_filter_option_dept").value;
            var destOption = document.getElementById("flight_filter_option_dest").value;
            var searchOption = document.getElementById("search_filter").value;
            var deptValue = deptOption === "#" ? "all" : deptOption.toLowerCase();
            var destValue = destOption === "#" ? "all" : destOption.toLowerCase();
            var searchValue = searchOption === "" ? "all" : searchOption.toLowerCase();
            var searchData = [deptValue, destValue, searchValue];
            var concatenatedSearchData = searchData.join(",");
            axios.default
                .get("http://localhost:8000/flights/getAllFilter/".concat(searchData))
                .then(function (response) {
                var divContainer = document.querySelector(".allHotels");
                divContainer.innerHTML = "";
                response.data.forEach(function (item) {
                    var cardContainer = document.createElement("div");
                    cardContainer.setAttribute("class", "userFlightCard");
                    var imgContainer = document.createElement("div");
                    imgContainer.setAttribute("id", "adminDashboardFlightImg");
                    var imgFlight = document.createElement("img");
                    imgFlight.src = "../../images/flights/".concat(item.image1);
                    imgContainer.appendChild(imgFlight);
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
                    imgElement.src = "../../assets/img/dashboard_flight_journey.png";
                    var itemElementfordest = document.createElement("div");
                    itemElementfordest.setAttribute("id", "dashboard_location_name");
                    var itemElement2Inner2 = document.createElement("span");
                    itemElement2Inner2.textContent = "Destination";
                    var itemElement4 = document.createElement("p");
                    itemElement4.setAttribute("id", "dashboard_contact_name");
                    var bookBtn = document.createElement("button");
                    // Set the hotelId as a data attribute for each button
                    bookBtn.setAttribute("flightId", item.id);
                    itemElement1.textContent = "Flight Name: ".concat(item.flightname);
                    itemElementfordept.textContent = "".concat(item.flightdepart);
                    itemElementfordest.textContent = "".concat(item.flightdest);
                    itemElement4.textContent = "Contact: ".concat(item.phoneno);
                    bookBtn.textContent = "Book Now";
                    itemElementfordept.append(itemElement2Inner1);
                    itemElementfordest.append(itemElement2Inner2);
                    itemElement2.append(itemElementfordept);
                    itemElement2.append(imgElement);
                    itemElement2.append(itemElementfordest);
                    flightInfoContainer.appendChild(itemElement1);
                    flightInfoContainer.appendChild(itemElement2);
                    flightInfoContainer.appendChild(itemElement4);
                    flightInfoContainer.appendChild(bookBtn);
                    cardContainer.appendChild(imgContainer);
                    cardContainer.appendChild(flightInfoContainer);
                    divContainer.appendChild(cardContainer);
                    bookBtn.addEventListener("click", function () {
                        var bookId = Number(this.getAttribute("flightId"));
                        console.log("Book clicked for flightId:", bookId);
                        var bookFormDiv = document.getElementById("bookFormDiv");
                        var bookForm = document.getElementById("bookFlight");
                        bookFormDiv.style.visibility = "visible";
                        bookForm.style.opacity = "1";
                        var selectedItem = response.data.find(function (item) { return item.id === bookId; });
                        document.getElementById("bookFlightName").value = selectedItem.flightname;
                        document.getElementById("bookSeatType").addEventListener("change", function () {
                            var selectedSeatType = this.value;
                            var seatRate = function () {
                                switch (selectedSeatType) {
                                    case "economy":
                                        return selectedItem.economyrate;
                                    case "business":
                                        return selectedItem.businessrate;
                                }
                            };
                            document.getElementById("bookSeatRate").value = seatRate();
                        });
                        // SUBMIT THE FILLED HOTEL BOOKINGS FORM, CALL API ENDPOINT
                        document
                            .getElementById("bookFlight")
                            .addEventListener("submit", function (event) {
                            event.preventDefault();
                            // const hotelId = Number(this.getAttribute('bookid'));
                            var flightname = document.getElementById("bookFlightName").value;
                            var departureDate = document.getElementById("bookDeptDate").value;
                            var seat_type = document.getElementById("bookSeatType").value;
                            var seat_rate = document.getElementById("bookSeatRate").value;
                            var seat_count = document.getElementById("bookSeatCount").value;
                            var formData = {
                                userId: token,
                                flightId: bookId,
                                flightname: flightname,
                                departureDate: departureDate,
                                seat_type: seat_type,
                                seat_rate: seat_rate,
                                seat_count: seat_count,
                            };
                            console.log(formData);
                            axios.default
                                .post("http://localhost:8000/book/bookNewFlight", formData)
                                .then(function (response) {
                                if (response.status === 200) {
                                    // console.log(response.data[0].id, response.data[0].firstname);
                                    alert("Flight booked successful");
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
            })
                .catch(function (error) {
                alert("No flights found");
                window.location.href = "./userFlights.html"; // Replace '/dashboard' with your desired page
            });
        });
    }
    else {
        localStorage.removeItem("accessToken");
        window.location.href = "../login.html";
    }
});
