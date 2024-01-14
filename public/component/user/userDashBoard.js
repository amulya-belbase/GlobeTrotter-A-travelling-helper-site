function hideHotelPopUp() {
  const bookFormDiv = document.getElementById("bookFormDiv");
  bookFormDiv.style.visibility = "hidden";
}

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("accessToken");

  if (token) {
    // TO GET ALL THE USER BOOKED HOTELS
    axios
      .get(`http://localhost:8000/book/myHotels/${token}`)
      .then((response) => {
        const responseCount = response.data.length;

        if (responseCount === 0) {
          document.getElementById("total_hotel_number").textContent = "0";
          console.log("this user doesn't have any data");
        } else {
          document.getElementById("total_hotel_number").textContent =
            responseCount;

          const divContainer = document.querySelector(".userHotels");
          response.data.forEach((item) => {
            const cardContainer = document.createElement("div");
            cardContainer.setAttribute("class", "userHotelCard");

            const imgContainer = document.createElement("div");
            imgContainer.setAttribute("id", "userDashboardHotelImg");
            const imgHotel = document.createElement("img");

            axios
              .get(
                `http://localhost:8000/hotels/getHotelForUser/${item.hotelId}`
              )
              .then((response) => {
                imgHotel.src = `../../images/hotels/${response.data[0].image1}`;
              });
            imgContainer.appendChild(imgHotel);

            const hotelInfoContainer = document.createElement("div");
            hotelInfoContainer.setAttribute("id", "userDashboardHotelInfo");

            const itemElement1 = document.createElement("p");
            itemElement1.setAttribute("id", "dashboard_hotel_name_user");
            const itemElement2 = document.createElement("p");
            itemElement2.setAttribute("id", "dashboard_location_name_user");
            const itemElement3 = document.createElement("p");
            itemElement3.setAttribute("id", "dashboard_contact_name_user");

            const itemELement4 = document.createElement("button");
            itemELement4.setAttribute("id", "downloadBtn");
            itemELement4.setAttribute("downloadId", item.id);

            const btnContainer = document.createElement("div");
            btnContainer.setAttribute("id", "dashboard_btn");
            const updateBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");

            // Set the hotelId as a data attribute for each button
            updateBtn.setAttribute("updateBtn", item.id);
            deleteBtn.setAttribute("deleteBtn", item.id);
            deleteBtn.setAttribute("id", "dashboard_deleteBtn");

            // to format the date
            const dateString = item.arrivalDate;
            const dateObject = new Date(dateString);
            const options = {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            };
            const formattedDate = dateObject.toLocaleDateString(options);

            itemElement1.textContent = `Hotel Name: ${item.hotelname}`;
            itemElement2.textContent = `Arrival Date: ${formattedDate}`;
            itemElement3.textContent = `Room Type: ${item.room_type}`;
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

            divContainer.appendChild(cardContainer);

            itemELement4.addEventListener("click", function () {
              const dataId = Number(this.getAttribute("downloadId"));
              const bookId = Number(updateBtn.getAttribute("updateBtn"));
              // 'arraybuffer' -> converts the response body into an ArrayBuffer object -> work with binary data directly
              // for pdf files -> the PDF data is binary, and using arraybuffer allows you to handle this binary data appropriately.
              if (dataId == bookId) {
                axios
                  .get(`http://localhost:8000/book/downloadHotel/${dataId}`, {
                    responseType: "arraybuffer",
                  })
                  .then((response) => {
                    // Binary Large Object -> container for binary data
                    const blob = new Blob([response.data], {
                      type: "application/pdf",
                    });

                    // creates a url context for the said blob
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank");
                  })
                  .catch((error) => {
                    console.error("Error updating hotel:", error);
                    // Handle error while trying to update the hotel
                    // if (error.response.status === 401) {
                    //     alert("Unauthorized request");
                    // }
                  });
              } else {
                alert("Unauthorized Request");
                window.location.href = "./userDashBoard.html";
              }
            });

            updateBtn.addEventListener("click", function () {
              const bookId = Number(this.getAttribute("updateBtn"));
              console.log("Update clicked for bookId:", bookId);

              const updateFormDiv = document.getElementById("bookFormDiv");
              const updateForm = document.getElementById("bookHotel");
              updateFormDiv.style.visibility = "visible";
              updateForm.style.opacity = "1";

              try {
                const selectedItem = response.data.find(
                  (item) => item.id === bookId
                );

                document.getElementById("bookHotelName").value =
                  selectedItem.hotelname;

                const arrivalDate = new Date(selectedItem.arrivalDate);
                const formattedDate = arrivalDate.toISOString().split("T")[0];
                document.getElementById("bookArrivalDate").value =
                  formattedDate;

                document.getElementById("bookRoomCount").value =
                  selectedItem.room_count;
                const hotelId = selectedItem.hotelId;

                // To change the rate according to option change in dropdown
                document
                  .getElementById("bookRoomType")
                  .addEventListener("change", function () {
                    const selectedRoomType = this.value;
                    axios
                      .get(
                        `http://localhost:8000/hotels/getHotelForUser/${hotelId}`
                      )
                      .then((response) => {
                        const roomRate = () => {
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
                  const hotelname =
                    document.getElementById("bookHotelName").value;
                  const arrivalDate =
                    document.getElementById("bookArrivalDate").value;
                  const room_type =
                    document.getElementById("bookRoomType").value;
                  const room_rate =
                    document.getElementById("bookRoomRate").value;
                  const room_count =
                    document.getElementById("bookRoomCount").value;

                  const formData = {
                    userId: token,
                    hotelId: hotelId,
                    hotelname: hotelname,
                    arrivalDate: arrivalDate,
                    room_type: room_type,
                    room_rate: room_rate,
                    room_count: room_count,
                    createdat: selectedItem.createdat,
                  };
                  // console.log(formData,bookId);

                  // Send form data using Axios
                  axios
                    .put(
                      `http://localhost:8000/book/updateMyHotel/${bookId}`,
                      formData
                    )
                    .then((response) => {
                      if (response.status === 200) {
                        updateFormDiv.style.visibility = "hidden";
                        updateForm.style.opacity = "0";
                        alert("Hotel booking updated successfully");
                        window.location.href = "./userDashBoard.html";
                      }
                    })
                    .catch((error) => {
                      console.error("Error updating hotel:", error);
                      // Handle error while trying to update the hotel
                      if (error.response.status === 401) {
                        localStorage.removeItem("accessToken");
                        window.location.href = "../login.html";
                      }
                    });
                });
              } catch (error) {
                updateFormDiv.style.visibility = "hidden";
                updateForm.style.opacity = "0";
                alert("Unauthorized request");
                window.location.href = "./userDashBoard.html";
              }
            });

            // Event listener for the delete button
            deleteBtn.addEventListener("click", function () {
              const id = Number(this.getAttribute("deleteBtn"));
              const ids = [id, token];
              const concatenatedIds = ids.join(",");

              axios
                .delete(
                  `http://localhost:8000/book/deleteMyHotel/${concatenatedIds}`
                )
                .then((response) => {
                  if (response.status === 200) {
                    alert("Hotel booking deleted successfully");
                  }
                  console.log(`Hotel with ID ${id} deleted successfully`);
                  // this.parentNode.remove();

                  window.location.href = "./userDashBoard.html";
                })
                .catch((error) => {
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
      .catch((error) => {
        if (error.response.status === 401) {
          alert("You need to have a travellers account");
          localStorage.removeItem("accessToken");
          window.location.href = "../login.html";
        }
      });

    // TO GET ALL THE USER BOOKED FLIGHTS
    axios
      .get(`http://localhost:8000/book/myFlights/${token}`)
      .then((response) => {
        const responseCount = response.data.length;

        if (responseCount === 0) {
          document.getElementById("total_flight_number").textContent = "0";
          console.log("this user doesn't have any data");
        } else {
          const divContainer = document.querySelector(".userFlights");
          document.getElementById("total_flight_number").textContent =
            responseCount;

          response.data.forEach((item) => {
            const cardContainer = document.createElement("div");
            cardContainer.setAttribute("class", "userFlightCard");

            const flightImgContainer = document.createElement("div");
            flightImgContainer.setAttribute("id", "adminDashboardFlightImg");
            const flightImg = document.createElement("img");

            const flightInfoContainer = document.createElement("div");
            flightInfoContainer.setAttribute("id", "adminDashboardFlightInfo");

            const itemElement1 = document.createElement("p");
            itemElement1.setAttribute("id", "dashboard_hotel_name");

            const itemElement2 = document.createElement("div");
            itemElement2.setAttribute("class", "userFlightCardFlight");
            const itemElementfordept = document.createElement("div");
            itemElementfordept.setAttribute("id", "dashboard_location_name");
            const itemElement2Inner1 = document.createElement("span");
            itemElement2Inner1.textContent = "Departure";
            const imgElement = document.createElement("img");
            imgElement.src = "../../assets/img/dashboard_flight_journey.png";
            const itemElementfordest = document.createElement("div");
            itemElementfordest.setAttribute("id", "dashboard_location_name");
            const itemElement2Inner2 = document.createElement("span");
            itemElement2Inner2.textContent = "Destination";

            const itemElement4 = document.createElement("p");
            itemElement4.setAttribute("id", "dashboard_departure_date");

            const itemElement5 = document.createElement("p");
            itemElement5.setAttribute("id", "dashboard_contact_name");

            const itemELement6 = document.createElement("button");
            itemELement6.setAttribute("id", "downloadBtn");
            itemELement6.setAttribute("downloadId", item.id);
            itemELement6.textContent = "Download Itinerary";

            const btnContainer = document.createElement("div");
            btnContainer.setAttribute("id", "dashboard_btn");
            const updateBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");

            // Set the hotelId as a data attribute for each button
            updateBtn.setAttribute("updateBtn", item.id);
            deleteBtn.setAttribute("deleteBtn", item.id);
            deleteBtn.setAttribute("id", "dashboard_deleteBtn");

            const dateString = item.departureDate;
            const dateObject = new Date(dateString);
            const options = {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            };
            const formattedDate = dateObject.toLocaleDateString(options);

            axios
              .get(
                `http://localhost:8000/flights/getFlightForUser/${item.flightId}`
              )
              .then((response) => {
                response.data.forEach((item) => {
                  itemElementfordept.textContent = `${item.flightdepart}`;
                  itemElementfordest.textContent = `${item.flightdest}`;
                  itemElement5.textContent = `Contact No.: ${item.phoneno}`;
                  flightImg.src = `../../images/flights/${item.image1}`;
                  itemElementfordept.append(itemElement2Inner1);
                  itemElementfordest.append(itemElement2Inner2);
                });
              });
            flightImgContainer.appendChild(flightImg);
            itemElement1.textContent = `Flight Name: ${item.flightname}`;
            itemElement4.textContent = `Departure Date: ${formattedDate}`;

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

            divContainer.appendChild(cardContainer);

            itemELement6.addEventListener("click", function () {
              const dataId = Number(this.getAttribute("downloadId"));
              const bookId = Number(updateBtn.getAttribute("updateBtn"));
              if (dataId === bookId) {
                axios
                  .get(`http://localhost:8000/book/downloadFlight/${dataId}`, {
                    responseType: "arraybuffer",
                  })
                  .then((response) => {
                    // Binary Large Object -> container for binary data
                    const blob = new Blob([response.data], {
                      type: "application/pdf",
                    });

                    // creates a url context for the said blob
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank");
                  })
                  .catch((error) => {
                    console.error("Error updating hotel:", error);
                    // Handle error while trying to update the hotel
                    if (error.response.status === 401) {
                      alert("Unauthorized request");
                    }
                  });
              } else {
                alert("Unauthorized Request");
                window.location.href = "./userDashBoard.html";
              }
            });

            updateBtn.addEventListener("click", function () {
              const bookId = Number(this.getAttribute("updateBtn"));
              console.log("Update clicked for bookId:", bookId);

              const updateFormDiv =
                document.getElementById("bookFlightFormDiv");
              const updateForm = document.getElementById("bookFlight");
              updateFormDiv.style.visibility = "visible";
              updateForm.style.opacity = "1";

              try {
                const selectedItem = response.data.find(
                  (item) => item.id === bookId
                );

                document.getElementById("bookFlightName").value =
                  selectedItem.flightname;

                const departureDate = new Date(selectedItem.departureDate);
                const formattedDate = departureDate.toISOString().split("T")[0];
                document.getElementById("bookDeptDate").value = formattedDate;

                document.getElementById("bookSeatCount").value =
                  selectedItem.seat_count;
                const flightId = selectedItem.flightId;

                // To change the rate according to option change in dropdown
                document
                  .getElementById("bookSeatType")
                  .addEventListener("change", function () {
                    const selectedRoomType = this.value;
                    axios
                      .get(
                        `http://localhost:8000/flights/getFlightForUser/${flightId}`
                      )
                      .then((response) => {
                        const roomRate = () => {
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
                  const flightname =
                    document.getElementById("bookFlightName").value;
                  const departureDate =
                    document.getElementById("bookDeptDate").value;
                  const seat_type =
                    document.getElementById("bookSeatType").value;
                  const seat_rate =
                    document.getElementById("bookSeatRate").value;
                  const seat_count =
                    document.getElementById("bookSeatCount").value;

                  const formData = {
                    userId: token,
                    flightId: flightId,
                    flightname: flightname,
                    departureDate: departureDate,
                    seat_type: seat_type,
                    seat_rate: seat_rate,
                    seat_count: seat_count,
                    createdat: selectedItem.createdat,
                  };
                  // console.log(formData,bookId);

                  // Send form data using Axios
                  axios
                    .put(
                      `http://localhost:8000/book/updateMyFlight/${bookId}`,
                      formData
                    )
                    .then((response) => {
                      if (response.status === 200) {
                        updateFormDiv.style.visibility = "hidden";
                        updateForm.style.opacity = "0";
                        alert("Flight booking updated successfully");
                        window.location.href = "./userDashBoard.html";
                      }
                    })
                    .catch((error) => {
                      console.error("Error updating flight:", error);
                      // Handle error while trying to update the hotel
                      if (error.response.status === 401) {
                        alert("Unauthorized request");
                        localStorage.removeItem("accessToken");
                        window.location.href = "../login.html";
                      }
                    });
                });
              } catch (error) {
                updateFormDiv.style.visibility = "hidden";
                updateForm.style.opacity = "0";
                alert("Unauthorized request");
                window.location.href = "./userDashBoard.html";
              }
            });

            // Event listener for the delete button
            deleteBtn.addEventListener("click", function () {
              const id = Number(this.getAttribute("deleteBtn"));
              const ids = [id, token];
              const concatenatedIds = ids.join(",");

              axios
                .delete(
                  `http://localhost:8000/book/deleteMyFlight/${concatenatedIds}`
                )
                .then((response) => {
                  if (response.status === 200) {
                    alert("Flight booking deleted successfully");
                  }
                  console.log(`Flight with ID ${id} deleted successfully`);
                  // this.parentNode.remove();

                  window.location.href = "./userDashBoard.html";
                })
                .catch((error) => {
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
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Unauthorized request");
          localStorage.removeItem("accessToken");
          window.location.href = "../login.html";
        }
        console.log(error);
      });
  } else {
    localStorage.removeItem("accessToken");
    window.location.href = "../login.html";
  }
});
