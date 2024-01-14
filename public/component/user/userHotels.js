function hideHotelPopUp() {
  const bookFormDiv = document.getElementById("bookFormDiv");
  bookFormDiv.style.visibility = "hidden";
}

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("accessToken");
  // Make sure userId exists before sending the request
  if (token) {
    const searchData = ["all", "all"];
    const concatenatedSearchData = searchData.join(",");
    axios
      .get(`http://localhost:8000/hotels/getAllFilter/${searchData}`)
      .then((response) => {
        if (response.data.length === 0) {
          console.log("There aren't any hotels");
        } else {
          const divContainer = document.querySelector(".allFlights");
          divContainer.innerHTML = "";

          response.data.forEach((item) => {
            const cardContainer = document.createElement("div");
            cardContainer.setAttribute("class", "userHotelCard");

            const imgContainer = document.createElement("div");
            imgContainer.setAttribute("id", "adminDashboardHotelImg");
            const hotelImg = document.createElement("img");
            hotelImg.src = `../../images/hotels/${item.image1}`;
            imgContainer.appendChild(hotelImg);

            const infoContainer = document.createElement("div");
            infoContainer.setAttribute("id", "adminDashboardHotelInfo");

            const itemElement1 = document.createElement("p");
            itemElement1.setAttribute("id", "userDashboard_flight_name");
            const itemElement2 = document.createElement("p");
            itemElement2.setAttribute("id", "userDashboard_flight_location");
            const itemElement3 = document.createElement("p");
            itemElement3.setAttribute("id", "userDashboard_flight_contact");

            const bookBtn = document.createElement("button");

            // Set the hotelId as a data attribute for each button
            bookBtn.setAttribute("bookId", item.id);
            bookBtn.setAttribute("id", "userDashboard_bookBtn");

            itemElement1.textContent = `Hotel Name: ${item.hotelname}`;
            itemElement2.textContent = `Location: ${item.location}`;
            itemElement3.textContent = `Contact: ${item.phoneno}`;

            bookBtn.textContent = "Book Now";

            infoContainer.appendChild(itemElement1);
            infoContainer.appendChild(itemElement2);
            infoContainer.appendChild(itemElement3);
            infoContainer.appendChild(bookBtn);

            cardContainer.appendChild(imgContainer);
            cardContainer.appendChild(infoContainer);

            divContainer.appendChild(cardContainer);

            bookBtn.addEventListener("click", function () {
              const bookId = Number(this.getAttribute("bookId"));
              console.log("Book clicked for hotelId:", bookId);

              const bookFormDiv = document.getElementById("bookFormDiv");
              const bookForm = document.getElementById("bookHotel");
              bookFormDiv.style.visibility = "visible";
              bookForm.style.opacity = "1";

              const selectedItem = response.data.find(
                (item) => item.id === bookId
              );
              document.getElementById("bookHotelName").value =
                selectedItem.hotelname;

              document
                .getElementById("bookRoomType")
                .addEventListener("change", function () {
                  const selectedRoomType = this.value;
                  const roomRate = () => {
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
                    hotelId: bookId,
                    hotelname: hotelname,
                    arrivalDate: arrivalDate,
                    room_type: room_type,
                    room_rate: room_rate,
                    room_count: room_count,
                  };

                  axios
                    .post("http://localhost:8000/book/bookNewHotel", formData)
                    .then((response) => {
                      if (response.status === 200) {
                        // console.log(response.data[0].id, response.data[0].firstname);
                        alert("Hotel booked successful");
                        window.location.href = "./userDashBoard.html"; // Replace '/dashboard' with your desired page
                      } else {
                        console.log(response);
                      }
                    })
                    .catch((error) => {
                      alert(
                        "Unauthorized Request. You should have a traveller's account to book Hotels"
                      );
                      localStorage.removeItem("accessToken");
                      window.location.href = "../login.html";
                      console.log(error.response.status);
                    });
                });
            });
          });
        }
      })
      .catch((error) => {
        alert("There aren't any hotels");
        window.location.href = "./userHotels.html";
        console.log(error);
      });

    // for hotel filter
    document
      .getElementById("flight_filter")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        const locationOption = document.getElementById(
          "location_filter_option"
        ).value;
        const searchOption = document.getElementById("search_filter").value;

        const locationValue =
          locationOption === "#" ? "all" : locationOption.toLowerCase();
        const searchValue =
          searchOption === "" ? "all" : searchOption.toLowerCase();

        const searchData = [locationValue, searchValue];
        const concatenatedSearchData = searchData.join(",");

        // TO GET ALL THE USER CREATED HOTELS
        axios
          .get(`http://localhost:8000/hotels/getAllFilter/${searchData}`)
          .then((response) => {
            if (response.data.length === 0) {
              console.log("There aren't any hotels");
            } else {
              const divContainer = document.querySelector(".allFlights");
              divContainer.innerHTML = "";

              response.data.forEach((item) => {
                const cardContainer = document.createElement("div");
                cardContainer.setAttribute("class", "userHotelCard");

                const imgContainer = document.createElement("div");
                imgContainer.setAttribute("id", "adminDashboardHotelImg");
                const hotelImg = document.createElement("img");
                hotelImg.src = `../../images/hotels/${item.image1}`;
                imgContainer.appendChild(hotelImg);

                const infoContainer = document.createElement("div");
                infoContainer.setAttribute("id", "adminDashboardHotelInfo");

                const itemElement1 = document.createElement("p");
                itemElement1.setAttribute("id", "userDashboard_flight_name");
                const itemElement2 = document.createElement("p");
                itemElement2.setAttribute(
                  "id",
                  "userDashboard_flight_location"
                );
                const itemElement3 = document.createElement("p");
                itemElement3.setAttribute("id", "userDashboard_flight_contact");

                const bookBtn = document.createElement("button");

                // Set the hotelId as a data attribute for each button
                bookBtn.setAttribute("bookId", item.id);
                bookBtn.setAttribute("id", "userDashboard_bookBtn");

                itemElement1.textContent = `Hotel Name: ${item.hotelname}`;
                itemElement2.textContent = `Location: ${item.location}`;
                itemElement3.textContent = `Contact: ${item.phoneno}`;

                bookBtn.textContent = "Book Now";

                infoContainer.appendChild(itemElement1);
                infoContainer.appendChild(itemElement2);
                infoContainer.appendChild(itemElement3);
                infoContainer.appendChild(bookBtn);

                cardContainer.appendChild(imgContainer);
                cardContainer.appendChild(infoContainer);

                divContainer.appendChild(cardContainer);

                bookBtn.addEventListener("click", function () {
                  const bookId = Number(this.getAttribute("bookId"));
                  console.log("Book clicked for hotelId:", bookId);

                  const bookFormDiv = document.getElementById("bookFormDiv");
                  const bookForm = document.getElementById("bookHotel");
                  bookFormDiv.style.visibility = "visible";
                  bookForm.style.opacity = "1";

                  const selectedItem = response.data.find(
                    (item) => item.id === bookId
                  );
                  document.getElementById("bookHotelName").value =
                    selectedItem.hotelname;

                  document
                    .getElementById("bookRoomType")
                    .addEventListener("change", function () {
                      const selectedRoomType = this.value;
                      const roomRate = () => {
                        switch (selectedRoomType) {
                          case "single":
                            return selectedItem.singleroomrate;
                          case "double":
                            return selectedItem.doubleroomrate;
                          case "suite":
                            return selectedItem.suiterate;
                        }
                      };
                      document.getElementById("bookRoomRate").value =
                        roomRate();
                    });

                  // SUBMIT THE FILLED HOTEL BOOKINGS FORM, CALL API ENDPOINT
                  document
                    .getElementById("bookHotel")
                    .addEventListener("submit", function (event) {
                      event.preventDefault(); // Prevent default form submission
                      // const hotelId = Number(this.getAttribute('bookid'));
                      const userId = localStorage.getItem("userId");
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
                        hotelId: bookId,
                        hotelname: hotelname,
                        arrivalDate: arrivalDate,
                        room_type: room_type,
                        room_rate: room_rate,
                        room_count: room_count,
                      };

                      axios
                        .post(
                          "http://localhost:8000/book/bookNewHotel",
                          formData
                        )
                        .then((response) => {
                          if (response.status === 200) {
                            // console.log(response.data[0].id, response.data[0].firstname);
                            alert("Hotel booked successful");
                            window.location.href = "./userDashBoard.html"; // Replace '/dashboard' with your desired page
                          } else {
                            console.log(response);
                          }
                        })
                        .catch((error) => {
                          alert(
                            "Unauthorized Request. You should have a traveller's account to book Hotels"
                          );
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
          .catch((error) => {
            alert("There aren't any hotels");
            window.location.href = "./userHotels.html";
            console.log(error);
          });
      });
  } else {
    localStorage.removeItem("accessToken");
    window.location.href = "../login.html";
  }
});
