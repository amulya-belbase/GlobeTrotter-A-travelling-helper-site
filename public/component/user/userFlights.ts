import axios from "axios";

function hideHotelPopUp() {
  const bookFormDiv = document.getElementById("bookFormDiv");
  bookFormDiv!.style.visibility = "hidden";
}

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("accessToken");

  // Make sure userId exists before sending the request
  if (token) {
    const searchData = ["all", "all", "all"];
    const concatenatedSearchData = searchData.join(",");
    axios
      .get(`http://localhost:8000/flights/getAllFilter/${searchData}`)
      .then((response) => {
        const divContainer = document.querySelector(".allHotels");
        divContainer!.innerHTML = "";

        response.data.forEach((item: any) => {
          const cardContainer = document.createElement("div");
          cardContainer.setAttribute("class", "userFlightCard");

          const imgContainer = document.createElement("div");
          imgContainer.setAttribute("id", "adminDashboardFlightImg");
          const imgFlight = document.createElement("img");
          imgFlight.src = `../../images/flights/${item.image1}`;
          imgContainer.appendChild(imgFlight);

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
          itemElement4.setAttribute("id", "dashboard_contact_name");

          const bookBtn = document.createElement("button");

          // Set the hotelId as a data attribute for each button
          bookBtn.setAttribute("flightId", item.id);

          itemElement1.textContent = `Flight Name: ${item.flightname}`;
          itemElementfordept.textContent = `${item.flightdepart}`;
          itemElementfordest.textContent = `${item.flightdest}`;
          itemElement4.textContent = `Contact: ${item.phoneno}`;

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

          divContainer!.appendChild(cardContainer);

          bookBtn.addEventListener("click", function () {
            const bookId = Number(this.getAttribute("flightId"));
            console.log("Book clicked for flightId:", bookId);

            const bookFormDiv = document.getElementById("bookFormDiv");
            const bookForm = document.getElementById("bookFlight");
            bookFormDiv!.style.visibility = "visible";
            bookForm!.style.opacity = "1";

            const selectedItem = response.data.find(
              (item: any) => item.id === bookId
            );
            (
              document.getElementById("bookFlightName") as HTMLInputElement
            ).value = selectedItem.flightname;

            document
              .getElementById("bookSeatType")!
              .addEventListener("change", function () {
                const selectedSeatType = (this as HTMLInputElement).value;
                const seatRate = () => {
                  switch (selectedSeatType) {
                    case "economy":
                      return selectedItem.economyrate;
                    case "business":
                      return selectedItem.businessrate;
                  }
                };
                (
                  document.getElementById("bookSeatRate") as HTMLInputElement
                ).value = seatRate();
              });

            // SUBMIT THE FILLED HOTEL BOOKINGS FORM, CALL API ENDPOINT
            document
              .getElementById("bookFlight")!
              .addEventListener("submit", function (event) {
                event.preventDefault();
                // const hotelId = Number(this.getAttribute('bookid'));

                const flightname = (
                  document.getElementById("bookFlightName") as HTMLInputElement
                ).value;
                const departureDate = (
                  document.getElementById("bookDeptDate") as HTMLInputElement
                ).value;
                const seat_type = (
                  document.getElementById("bookSeatType") as HTMLInputElement
                ).value;
                const seat_rate = (
                  document.getElementById("bookSeatRate") as HTMLInputElement
                ).value;
                const seat_count = (
                  document.getElementById("bookSeatCount") as HTMLInputElement
                ).value;

                const formData = {
                  userId: token,
                  flightId: bookId,
                  flightname: flightname,
                  departureDate: departureDate,
                  seat_type: seat_type,
                  seat_rate: seat_rate,
                  seat_count: seat_count,
                };
                // console.log(formData);
                axios
                  .post("http://localhost:8000/book/bookNewFlight", formData)
                  .then((response) => {
                    if (response.status === 200) {
                      // console.log(response.data[0].id, response.data[0].firstname);
                      alert("Flight booked successful");
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
      })
      .catch((error) => {
        console.log(error);
      });

    document
      .getElementById("flight_filter")!
      .addEventListener("submit", function (event) {
        event.preventDefault();

        const deptOption = (
          document.getElementById(
            "flight_filter_option_dept"
          ) as HTMLInputElement
        ).value;
        const destOption = (
          document.getElementById(
            "flight_filter_option_dest"
          ) as HTMLInputElement
        ).value;
        const searchOption = (
          document.getElementById("search_filter") as HTMLInputElement
        ).value;

        const deptValue = deptOption === "#" ? "all" : deptOption.toLowerCase();
        const destValue = destOption === "#" ? "all" : destOption.toLowerCase();
        const searchValue =
          searchOption === "" ? "all" : searchOption.toLowerCase();

        const searchData = [deptValue, destValue, searchValue];
        const concatenatedSearchData = searchData.join(",");

        axios
          .get(`http://localhost:8000/flights/getAllFilter/${searchData}`)
          .then((response) => {
            const divContainer = document.querySelector(".allHotels");
            divContainer!.innerHTML = "";

            response.data.forEach((item: any) => {
              const cardContainer = document.createElement("div");
              cardContainer.setAttribute("class", "userFlightCard");

              const imgContainer = document.createElement("div");
              imgContainer.setAttribute("id", "adminDashboardFlightImg");
              const imgFlight = document.createElement("img");
              imgFlight.src = `../../images/flights/${item.image1}`;
              imgContainer.appendChild(imgFlight);

              const flightInfoContainer = document.createElement("div");
              flightInfoContainer.setAttribute(
                "id",
                "adminDashboardFlightInfo"
              );

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
              itemElement4.setAttribute("id", "dashboard_contact_name");

              const bookBtn = document.createElement("button");

              // Set the hotelId as a data attribute for each button
              bookBtn.setAttribute("flightId", item.id);

              itemElement1.textContent = `Flight Name: ${item.flightname}`;
              itemElementfordept.textContent = `${item.flightdepart}`;
              itemElementfordest.textContent = `${item.flightdest}`;
              itemElement4.textContent = `Contact: ${item.phoneno}`;

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

              divContainer!.appendChild(cardContainer);

              bookBtn.addEventListener("click", function () {
                const bookId = Number(this.getAttribute("flightId"));
                console.log("Book clicked for flightId:", bookId);

                const bookFormDiv = document.getElementById("bookFormDiv");
                const bookForm = document.getElementById("bookFlight");
                bookFormDiv!.style.visibility = "visible";
                bookForm!.style.opacity = "1";

                const selectedItem = response.data.find(
                  (item: any) => item.id === bookId
                );
                (
                  document.getElementById("bookFlightName") as HTMLInputElement
                ).value = selectedItem.flightname;

                (
                  document.getElementById("bookSeatType") as HTMLInputElement
                ).addEventListener("change", function () {
                  const selectedSeatType = this.value;
                  const seatRate = () => {
                    switch (selectedSeatType) {
                      case "economy":
                        return selectedItem.economyrate;
                      case "business":
                        return selectedItem.businessrate;
                    }
                  };
                  (
                    document.getElementById("bookSeatRate") as HTMLInputElement
                  ).value = seatRate();
                });

                // SUBMIT THE FILLED HOTEL BOOKINGS FORM, CALL API ENDPOINT
                document
                  .getElementById("bookFlight")!
                  .addEventListener("submit", function (event) {
                    event.preventDefault();
                    // const hotelId = Number(this.getAttribute('bookid'));

                    const flightname = (
                      document.getElementById(
                        "bookFlightName"
                      ) as HTMLInputElement
                    ).value;
                    const departureDate = (
                      document.getElementById(
                        "bookDeptDate"
                      ) as HTMLInputElement
                    ).value;
                    const seat_type = (
                      document.getElementById(
                        "bookSeatType"
                      ) as HTMLInputElement
                    ).value;
                    const seat_rate = (
                      document.getElementById(
                        "bookSeatRate"
                      ) as HTMLInputElement
                    ).value;
                    const seat_count = (
                      document.getElementById(
                        "bookSeatCount"
                      ) as HTMLInputElement
                    ).value;

                    const formData = {
                      userId: token,
                      flightId: bookId,
                      flightname: flightname,
                      departureDate: departureDate,
                      seat_type: seat_type,
                      seat_rate: seat_rate,
                      seat_count: seat_count,
                    };
                    console.log(formData);
                    axios
                      .post(
                        "http://localhost:8000/book/bookNewFlight",
                        formData
                      )
                      .then((response) => {
                        if (response.status === 200) {
                          // console.log(response.data[0].id, response.data[0].firstname);
                          alert("Flight booked successful");
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
          })
          .catch((error) => {
            alert("No flights found");
            window.location.href = "./userFlights.html"; // Replace '/dashboard' with your desired page
          });
      });
  } else {
    localStorage.removeItem("accessToken");
    window.location.href = "../login.html";
  }
});
