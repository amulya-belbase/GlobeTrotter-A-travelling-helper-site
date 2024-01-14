"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var axios = require("axios");
function hideHotelPopUp() {
    var bookFormDiv = document.getElementById("bookFormDiv");
    bookFormDiv.style.visibility = "hidden";
}
document.addEventListener("DOMContentLoaded", function () {
    var token = localStorage.getItem("accessToken");
    if (token) {
        // TO GET ALL THE USER BOOKED HOTELS
        axios.default
            .get("http://localhost:8000/book/myHotels/".concat(token))
            .then(function (response) {
            var responseCount = response.data.length;
            if (responseCount === 0) {
                document.getElementById("total_hotel_number").textContent = "0";
                console.log("this user doesn't have any data");
            }
            else {
                document.getElementById("total_hotel_number").textContent = responseCount;
                var divContainer_1 = document.querySelector(".userHotels");
                response.data.forEach(function (item) {
                    var cardContainer = document.createElement("div");
                    cardContainer.setAttribute("class", "userHotelCard");
                    var imgContainer = document.createElement("div");
                    imgContainer.setAttribute("id", "userDashboardHotelImg");
                    var imgHotel = document.createElement("img");
                    axios.default
                        .get("http://localhost:8000/hotels/getHotelForUser/".concat(item.hotelId))
                        .then(function (response) {
                        imgHotel.src = "../../images/hotels/".concat(response.data[0].image1);
                    });
                    imgContainer.appendChild(imgHotel);
                    var hotelInfoContainer = document.createElement("div");
                    hotelInfoContainer.setAttribute("id", "userDashboardHotelInfo");
                    var itemElement1 = document.createElement("p");
                    itemElement1.setAttribute("id", "dashboard_hotel_name_user");
                    var itemElement2 = document.createElement("p");
                    itemElement2.setAttribute("id", "dashboard_location_name_user");
                    var itemElement3 = document.createElement("p");
                    itemElement3.setAttribute("id", "dashboard_contact_name_user");
                    var itemELement4 = document.createElement("button");
                    itemELement4.setAttribute("id", "downloadBtn");
                    itemELement4.setAttribute("downloadId", item.id);
                    var btnContainer = document.createElement("div");
                    btnContainer.setAttribute("id", "dashboard_btn");
                    var updateBtn = document.createElement("button");
                    var deleteBtn = document.createElement("button");
                    // Set the hotelId as a data attribute for each button
                    updateBtn.setAttribute("updateBtn", item.id);
                    deleteBtn.setAttribute("deleteBtn", item.id);
                    deleteBtn.setAttribute("id", "dashboard_deleteBtn");
                    // to format the date
                    var dateString = item.arrivalDate;
                    var dateObject = new Date(dateString);
                    var options = {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'Asia/Kathmandu' // Nepali time zone
                    };
                    var formattedDate = dateObject.toLocaleDateString('ne-NP', options);
                    itemElement1.textContent = "Hotel Name: ".concat(item.hotelname);
                    itemElement2.textContent = "Arrival Date: ".concat(formattedDate);
                    itemElement3.textContent = "Room Type: ".concat(item.room_type);
                    itemELement4.textContent = "Download Itinerary";
                    updateBtn.textContent = "Update";
                    deleteBtn.textContent = "Delete";
                    btnContainer.appendChild(updateBtn);
                    btnContainer.appendChild(deleteBtn);
                    hotelInfoContainer.appendChild(itemElement1);
                    hotelInfoContainer.appendChild(itemElement2);
                    hotelInfoContainer.appendChild(itemElement3);
                    hotelInfoContainer.appendChild(btnContainer);
                    hotelInfoContainer.appendChild(itemELement4);
                    cardContainer.appendChild(imgContainer);
                    cardContainer.appendChild(hotelInfoContainer);
                    divContainer_1.appendChild(cardContainer);
                    itemELement4.addEventListener("click", function () {
                        var dataId = Number(this.getAttribute("downloadId"));
                        var bookId = Number(updateBtn.getAttribute("updateBtn"));
                        // 'arraybuffer' -> converts the response body into an ArrayBuffer object -> work with binary data directly
                        // for pdf files -> the PDF data is binary, and using arraybuffer allows you to handle this binary data appropriately.
                        if (dataId == bookId) {
                            axios.default
                                .get("http://localhost:8000/book/downloadHotel/".concat(dataId), {
                                responseType: "arraybuffer",
                            })
                                .then(function (response) {
                                // Binary Large Object -> container for binary data
                                var blob = new Blob([response.data], {
                                    type: "application/pdf",
                                });
                                // creates a url context for the said blob
                                var url = URL.createObjectURL(blob);
                                window.open(url, "_blank");
                            })
                                .catch(function (error) {
                                console.error("Error updating hotel:", error);
                                // Handle error while trying to update the hotel
                                // if (error.response.status === 401) {
                                //     alert("Unauthorized request");
                                // }
                            });
                        }
                        else {
                            alert("Unauthorized Request");
                            window.location.href = "./userDashBoard.html";
                        }
                    });
                    updateBtn.addEventListener("click", function () {
                        var bookId = Number(this.getAttribute("updateBtn"));
                        console.log("Update clicked for bookId:", bookId);
                        var updateFormDiv = document.getElementById("bookFormDiv");
                        var updateForm = document.getElementById("bookHotel");
                        updateFormDiv.style.visibility = "visible";
                        updateForm.style.opacity = "1";
                        try {
                            var selectedItem_1 = response.data.find(function (item) { return item.id === bookId; });
                            document.getElementById("bookHotelName").value =
                                selectedItem_1.hotelname;
                            var arrivalDate = new Date(selectedItem_1.arrivalDate);
                            var formattedDate_1 = arrivalDate.toISOString().split("T")[0];
                            document.getElementById("bookArrivalDate").value =
                                formattedDate_1;
                            document.getElementById("bookRoomCount").value =
                                selectedItem_1.room_count;
                            var hotelId_1 = selectedItem_1.hotelId;
                            // To change the rate according to option change in dropdown
                            document
                                .getElementById("bookRoomType")
                                .addEventListener("change", function () {
                                var selectedRoomType = this.value;
                                axios.default
                                    .get("http://localhost:8000/hotels/getHotelForUser/".concat(hotelId_1))
                                    .then(function (response) {
                                    var roomRate = function () {
                                        switch (selectedRoomType) {
                                            case "single":
                                                return response.data[0].singleroomrate;
                                            case "double":
                                                return response.data[0].doubleroomrate;
                                            case "suite":
                                                return response.data[0].suiterate;
                                        }
                                    };
                                    document.getElementById("bookRoomRate").value =
                                        roomRate();
                                });
                            });
                            updateForm.addEventListener("submit", function (event) {
                                event.preventDefault(); // Prevent default form submission
                                // Get form data
                                var hotelname = document.getElementById("bookHotelName").value;
                                var arrivalDate = document.getElementById("bookArrivalDate").value;
                                var room_type = document.getElementById("bookRoomType").value;
                                var room_rate = document.getElementById("bookRoomRate").value;
                                var room_count = document.getElementById("bookRoomCount").value;
                                var formData = {
                                    userId: token,
                                    hotelId: hotelId_1,
                                    hotelname: hotelname,
                                    arrivalDate: arrivalDate,
                                    room_type: room_type,
                                    room_rate: room_rate,
                                    room_count: room_count,
                                    createdat: selectedItem_1.createdat,
                                };
                                // console.log(formData,bookId);
                                // Send form data using Axios
                                axios.default
                                    .put("http://localhost:8000/book/updateMyHotel/".concat(bookId), formData)
                                    .then(function (response) {
                                    if (response.status === 200) {
                                        updateFormDiv.style.visibility = "hidden";
                                        updateForm.style.opacity = "0";
                                        alert("Hotel booking updated successfully");
                                        window.location.href = "./userDashBoard.html";
                                    }
                                })
                                    .catch(function (error) {
                                    console.error("Error updating hotel:", error);
                                    // Handle error while trying to update the hotel
                                    if (error.response.status === 401) {
                                        localStorage.removeItem("accessToken");
                                        window.location.href = "../login.html";
                                    }
                                });
                            });
                        }
                        catch (error) {
                            updateFormDiv.style.visibility = "hidden";
                            updateForm.style.opacity = "0";
                            alert("Unauthorized request");
                            window.location.href = "./userDashBoard.html";
                        }
                    });
                    // Event listener for the delete button
                    deleteBtn.addEventListener("click", function () {
                        var id = Number(this.getAttribute("deleteBtn"));
                        var ids = [id, token];
                        var concatenatedIds = ids.join(",");
                        axios.default
                            .delete("http://localhost:8000/book/deleteMyHotel/".concat(concatenatedIds))
                            .then(function (response) {
                            if (response.status === 200) {
                                alert("Hotel booking deleted successfully");
                            }
                            console.log("Hotel with ID ".concat(id, " deleted successfully"));
                            // this.parentNode.remove();
                            window.location.href = "./userDashBoard.html";
                        })
                            .catch(function (error) {
                            console.error("Error deleting hotel:", error);
                            if (error.response.status === 401) {
                                alert("Unauthorized request");
                                localStorage.removeItem("accessToken");
                                window.location.href = "../login.html";
                            }
                        });
                    });
                });
            }
        })
            .catch(function (error) {
            if (error.response.status === 401) {
                alert("You need to have a travellers account");
                localStorage.removeItem("accessToken");
                window.location.href = "../login.html";
            }
        });
        // TO GET ALL THE USER BOOKED FLIGHTS
        axios.default
            .get("http://localhost:8000/book/myFlights/".concat(token))
            .then(function (response) {
            var responseCount = response.data.length;
            if (responseCount === 0) {
                document.getElementById("total_flight_number").textContent = "0";
                console.log("this user doesn't have any data");
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
                    itemElement4.setAttribute("id", "dashboard_departure_date");
                    var itemElement5 = document.createElement("p");
                    itemElement5.setAttribute("id", "dashboard_contact_name");
                    var itemELement6 = document.createElement("button");
                    itemELement6.setAttribute("id", "downloadBtn");
                    itemELement6.setAttribute("downloadId", item.id);
                    itemELement6.textContent = "Download Itinerary";
                    var btnContainer = document.createElement("div");
                    btnContainer.setAttribute("id", "dashboard_btn");
                    var updateBtn = document.createElement("button");
                    var deleteBtn = document.createElement("button");
                    // Set the hotelId as a data attribute for each button
                    updateBtn.setAttribute("updateBtn", item.id);
                    deleteBtn.setAttribute("deleteBtn", item.id);
                    deleteBtn.setAttribute("id", "dashboard_deleteBtn");
                    var dateString = item.departureDate;
                    var dateObject = new Date(dateString);
                    var options = {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'Asia/Kathmandu' // Nepali time zone
                    };
                    var formattedDate = dateObject.toLocaleDateString('ne-NP', options);
                    axios.default
                        .get("http://localhost:8000/flights/getFlightForUser/".concat(item.flightId))
                        .then(function (response) {
                        response.data.forEach(function (item) {
                            itemElementfordept.textContent = "".concat(item.flightdepart);
                            itemElementfordest.textContent = "".concat(item.flightdest);
                            itemElement5.textContent = "Contact No.: ".concat(item.phoneno);
                            flightImg.src = "../../images/flights/".concat(item.image1);
                            itemElementfordept.append(itemElement2Inner1);
                            itemElementfordest.append(itemElement2Inner2);
                        });
                    });
                    flightImgContainer.appendChild(flightImg);
                    itemElement1.textContent = "Flight Name: ".concat(item.flightname);
                    itemElement4.textContent = "Departure Date: ".concat(formattedDate);
                    updateBtn.textContent = "Update";
                    deleteBtn.textContent = "Delete";
                    btnContainer.appendChild(updateBtn);
                    btnContainer.appendChild(deleteBtn);
                    itemElement2.append(itemElementfordept);
                    itemElement2.append(imgElement);
                    itemElement2.append(itemElementfordest);
                    flightInfoContainer.appendChild(itemElement1);
                    flightInfoContainer.appendChild(itemElement2);
                    flightInfoContainer.appendChild(itemElement4);
                    flightInfoContainer.appendChild(itemElement5);
                    flightInfoContainer.appendChild(btnContainer);
                    flightInfoContainer.appendChild(itemELement6);
                    cardContainer.appendChild(flightImgContainer);
                    cardContainer.appendChild(flightInfoContainer);
                    divContainer_2.appendChild(cardContainer);
                    itemELement6.addEventListener("click", function () {
                        var dataId = Number(this.getAttribute("downloadId"));
                        var bookId = Number(updateBtn.getAttribute("updateBtn"));
                        if (dataId === bookId) {
                            axios.default
                                .get("http://localhost:8000/book/downloadFlight/".concat(dataId), {
                                responseType: "arraybuffer",
                            })
                                .then(function (response) {
                                // Binary Large Object -> container for binary data
                                var blob = new Blob([response.data], {
                                    type: "application/pdf",
                                });
                                // creates a url context for the said blob
                                var url = URL.createObjectURL(blob);
                                window.open(url, "_blank");
                            })
                                .catch(function (error) {
                                console.error("Error updating hotel:", error);
                                // Handle error while trying to update the hotel
                                if (error.response.status === 401) {
                                    alert("Unauthorized request");
                                }
                            });
                        }
                        else {
                            alert("Unauthorized Request");
                            window.location.href = "./userDashBoard.html";
                        }
                    });
                    updateBtn.addEventListener("click", function () {
                        var bookId = Number(this.getAttribute("updateBtn"));
                        console.log("Update clicked for bookId:", bookId);
                        var updateFormDiv = document.getElementById("bookFlightFormDiv");
                        var updateForm = document.getElementById("bookFlight");
                        updateFormDiv.style.visibility = "visible";
                        updateForm.style.opacity = "1";
                        try {
                            var selectedItem_2 = response.data.find(function (item) { return item.id === bookId; });
                            document.getElementById("bookFlightName").value =
                                selectedItem_2.flightname;
                            var departureDate = new Date(selectedItem_2.departureDate);
                            var formattedDate_2 = departureDate.toISOString().split("T")[0];
                            document.getElementById("bookDeptDate").value = formattedDate_2;
                            document.getElementById("bookSeatCount").value =
                                selectedItem_2.seat_count;
                            var flightId_1 = selectedItem_2.flightId;
                            // To change the rate according to option change in dropdown
                            document
                                .getElementById("bookSeatType")
                                .addEventListener("change", function () {
                                var selectedRoomType = this.value;
                                axios.default
                                    .get("http://localhost:8000/flights/getFlightForUser/".concat(flightId_1))
                                    .then(function (response) {
                                    var roomRate = function () {
                                        switch (selectedRoomType) {
                                            case "economy":
                                                return response.data[0].economyrate;
                                            case "business":
                                                return response.data[0].businessrate;
                                        }
                                    };
                                    document.getElementById("bookSeatRate").value =
                                        roomRate();
                                });
                            });
                            updateForm.addEventListener("submit", function (event) {
                                event.preventDefault(); // Prevent default form submission
                                // Get form data
                                var flightname = document.getElementById("bookFlightName").value;
                                var departureDate = document.getElementById("bookDeptDate").value;
                                var seat_type = document.getElementById("bookSeatType").value;
                                var seat_rate = document.getElementById("bookSeatRate").value;
                                var seat_count = document.getElementById("bookSeatCount").value;
                                var formData = {
                                    userId: token,
                                    flightId: flightId_1,
                                    flightname: flightname,
                                    departureDate: departureDate,
                                    seat_type: seat_type,
                                    seat_rate: seat_rate,
                                    seat_count: seat_count,
                                    createdat: selectedItem_2.createdat,
                                };
                                // console.log(formData,bookId);
                                // Send form data using Axios
                                axios.default
                                    .put("http://localhost:8000/book/updateMyFlight/".concat(bookId), formData)
                                    .then(function (response) {
                                    if (response.status === 200) {
                                        updateFormDiv.style.visibility = "hidden";
                                        updateForm.style.opacity = "0";
                                        alert("Flight booking updated successfully");
                                        window.location.href = "./userDashBoard.html";
                                    }
                                })
                                    .catch(function (error) {
                                    console.error("Error updating flight:", error);
                                    // Handle error while trying to update the hotel
                                    if (error.response.status === 401) {
                                        alert("Unauthorized request");
                                        localStorage.removeItem("accessToken");
                                        window.location.href = "../login.html";
                                    }
                                });
                            });
                        }
                        catch (error) {
                            updateFormDiv.style.visibility = "hidden";
                            updateForm.style.opacity = "0";
                            alert("Unauthorized request");
                            window.location.href = "./userDashBoard.html";
                        }
                    });
                    // Event listener for the delete button
                    deleteBtn.addEventListener("click", function () {
                        var id = Number(this.getAttribute("deleteBtn"));
                        var ids = [id, token];
                        var concatenatedIds = ids.join(",");
                        axios.default
                            .delete("http://localhost:8000/book/deleteMyFlight/".concat(concatenatedIds))
                            .then(function (response) {
                            if (response.status === 200) {
                                alert("Flight booking deleted successfully");
                            }
                            console.log("Flight with ID ".concat(id, " deleted successfully"));
                            // this.parentNode.remove();
                            window.location.href = "./userDashBoard.html";
                        })
                            .catch(function (error) {
                            console.error("Error deleting flight:", error);
                            if (error.response.status === 401) {
                                alert("Unauthorized request");
                                localStorage.removeItem("accessToken");
                                window.location.href = "../login.html";
                            }
                        });
                    });
                });
            }
        })
            .catch(function (error) {
            if (error.response.status === 401) {
                alert("Unauthorized request");
                localStorage.removeItem("accessToken");
                window.location.href = "../login.html";
            }
            console.log(error);
        });
    }
    else {
        localStorage.removeItem("accessToken");
        window.location.href = "../login.html";
    }
});
