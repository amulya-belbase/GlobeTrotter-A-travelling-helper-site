import axios from 'axios';

function hideHotelPopUp() {
    const updateFormDiv = document.getElementById("hotelFormDiv") as HTMLElement;
    updateFormDiv.style.visibility = "hidden";
  }
  function hideFlightPopUp() {
    const updateFormDiv = document.getElementById("flightFormDiv") as HTMLElement;
    updateFormDiv.style.visibility = "hidden";
  }
  document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("accessToken");
  
    // Make sure userId exists before sending the request
    if (token) {
      axios
        .get(`http://localhost:8000/parseAccessToken/${token}`)
        .then((response) => {
          if (response.data.role === "admin") {
            const userId = response.data.id;
            console.log(userId);
            axios
              .get(`http://localhost:8000/hotels/getHotelsById/${userId}`)
              .then((response) => {
                const responseCount = response.data.length;
                if (responseCount === 0) {
                  console.log("this user doesn't have any data");
                  document.getElementById("total_hotel_number")!.textContent = "0";
                } else {
                  const divContainer = document.querySelector(".userHotels");
                  document.getElementById("total_hotel_number")!.textContent =
                    responseCount;
                  response.data.forEach((item:any) => {
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
                    itemElement1.setAttribute("id", "dashboard_hotel_name");
                    const itemElement2 = document.createElement("p");
                    itemElement2.setAttribute("id", "dashboard_location_name");
                    const itemElement3 = document.createElement("p");
                    itemElement3.setAttribute("id", "dashboard_contact_name");
  
                    const btnContainer = document.createElement("div");
                    btnContainer.setAttribute("id", "dashboard_btn");
                    const updateBtn = document.createElement("button");
                    const deleteBtn = document.createElement("button");
  
                    // Set the hotelId as a data attribute for each button
                    updateBtn.setAttribute("updateBtn", item.id);
                    deleteBtn.setAttribute("deleteBtn", item.id);
                    deleteBtn.setAttribute("id", "dashboard_deleteBtn");
  
                    itemElement1.textContent = `Hotel Name: ${item.hotelname}`;
                    itemElement2.textContent = `Location: ${item.location}`;
                    itemElement3.textContent = `Contact: ${item.phoneno}`;
  
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
  
                    divContainer!.appendChild(cardContainer);
  
                    // Event listener for the update button
                    updateBtn.addEventListener("click", function () {
                      const hotelId = Number(this.getAttribute("updateBtn"));
                      console.log("Update clicked for hotelId:", hotelId);
  
                      const updateFormDiv =
                        document.getElementById("hotelFormDiv");
                      const updateForm = document.getElementById("updateHotel");
                      updateFormDiv!.style.visibility = "visible";
                      updateForm!.style.opacity = "1";
  
                      try {
                        const selectedItem = response.data.find(
                          (item:any) => item.id === hotelId
                        );
                        (document.getElementById("hotelname") as HTMLInputElement).value =
                          selectedItem.hotelname;
                        (document.getElementById("location")as HTMLInputElement).value =
                          selectedItem.location;
                        (document.getElementById("established")as HTMLInputElement).value =
                          selectedItem.established;
                        (document.getElementById("singleroom") as HTMLInputElement).value =
                          selectedItem.singlerooms;
                        (document.getElementById("singleroomrate") as HTMLInputElement).value =
                          selectedItem.singleroomrate;
                        (document.getElementById("doubleroom") as HTMLInputElement).value =
                          selectedItem.doublerooms;
                        (document.getElementById("doubleroomrate") as HTMLInputElement).value =
                          selectedItem.doubleroomrate;
                        (document.getElementById("suite") as HTMLInputElement).value =
                          selectedItem.suites;
                        (document.getElementById("suiterate") as HTMLInputElement).value =
                          selectedItem.suiterate;
                        (document.getElementById("website") as HTMLInputElement).value =
                          selectedItem.website;
                        (document.getElementById("email") as HTMLInputElement).value =
                          selectedItem.email;
                        (document.getElementById("phoneno") as HTMLInputElement).value =
                          selectedItem.phoneno;
  
                        updateForm!.addEventListener("submit", function (event) {
                          event.preventDefault(); // Prevent default form submission
  
                          // Get form data
                          const hotelname =
                            (document.getElementById("hotelname")as HTMLInputElement).value;
                          const location =
                            (document.getElementById("location") as HTMLInputElement).value;
                          const established =
                            (document.getElementById("established") as HTMLInputElement).value;
                          const singleroom =
                            (document.getElementById("singleroom") as HTMLInputElement).value;
                          const singleroomrate =
                            (document.getElementById("singleroomrate") as HTMLInputElement).value;
                          const doubleroom =
                            (document.getElementById("doubleroom") as HTMLInputElement).value;
                          const doubleroomrate =
                            (document.getElementById("doubleroomrate") as HTMLInputElement).value;
                          const suite = (document.getElementById("suite") as HTMLInputElement).value;
                          const suiterate =
                            (document.getElementById("suiterate") as HTMLInputElement).value;
                          const website =
                            (document.getElementById("website") as HTMLInputElement).value;
                          const email = (document.getElementById("email") as HTMLInputElement).value;
                          const phoneno =
                            (document.getElementById("phoneno") as HTMLInputElement).value;
                            const image1 = (document.getElementById("image1") as HTMLInputElement | null)?.files?.[0];
  
                          // FORM VALIDATION IS NEEDED
                          const updatedHotelData = {
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
                            createdat: selectedItem.createdat,
                          };
  
                          console.log(updatedHotelData);
  
                          axios
                            .post(
                              "http://localhost:8000/upload/hotel",
                              updatedHotelData,
                              {
                                headers: {
                                  "Content-Type": "multipart/form-data",
                                },
                              }
                            )
                            .then((response) => {
                              updatedHotelData.image1 = response.data.fileName;
                              console.log(updatedHotelData);
                              //         // Send form data using Axios
                              axios
                                .put(
                                  `http://localhost:8000/hotels/update/${hotelId}`,
                                  updatedHotelData
                                )
                                .then((response) => {
                                  if (response.status === 200) {
                                    updateFormDiv!.style.visibility = "hidden";
                                    updateForm!.style.opacity = "0";
                                    alert("Hotel updated successfully");
                                    window.location.href =
                                      "./adminDashBoard.html";
                                  }
                                })
                                .catch((error) => {
                                  console.error("Error updating hotel:", error);
                                  // Handle error while trying to update the hotel
                                  if (error.response.status === 401) {
                                    alert("Unauthorized request");
                                  }
                                });
                            })
                            .catch((error) => {
                              alert("Please upload an image of the hotel");
                              console.error(error);
                            });
                        });
                      } catch (error) {
                        updateFormDiv!.style.visibility = "hidden";
                        updateForm!.style.opacity = "0";
                        alert("Unauthorized request");
                        window.location.href = "./adminDashBoard.html";
                      }
                    });
  
                    // Event listener for the delete button
                    deleteBtn.addEventListener("click", function () {
                      const hotelId = Number(this.getAttribute("deleteBtn"));
                      const hotelIds = [hotelId, userId];
                      const concatenatedIds = hotelIds.join(",");
                      axios
                        .delete(
                          `http://localhost:8000/hotels/delete/${concatenatedIds}`
                        )
                        .then((response) => {
                          if (response.status === 200) {
                            alert("Hotel entry deleted successfully");
                          }
                          console.log(
                            `Hotel with ID ${hotelId} deleted successfully`
                          );
                          // this.parentNode.remove();
  
                          window.location.href = "./adminDashBoard.html";
                        })
                        .catch((error) => {
                          console.error("Error deleting hotel:", error);
                          if (error.response.status === 401) {
                            alert("Unauthorized request");
                            window.location.href = "./adminDashBoard.html";
                          }
                        });
                    });
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
  
            // TO GET ALL THE USER CREATED FLIGHTS
            axios
              .get(`http://localhost:8000/flights/getFlightsById/${userId}`)
              .then((response) => {
                const responseCount = response.data.length;
                if (responseCount === 0) {
                 ( document.getElementById("total_flight_number") as HTMLElement).textContent =
                    "0";
                  // console.log("this user doesn't have any data");
                } else {
                  const divContainer = document.querySelector(".userFlights");
                  (document.getElementById("total_flight_number") as HTMLElement).textContent =
                    responseCount;
                  response.data.forEach((item:any) => {
                    const cardContainer = document.createElement("div");
                    cardContainer.setAttribute("class", "userFlightCard");
  
                    const flightImgContainer = document.createElement("div");
                    flightImgContainer.setAttribute(
                      "id",
                      "adminDashboardFlightImg"
                    );
                    const flightImg = document.createElement("img");
                    flightImg.src = `../../images/flights/${item.image1}`;
                    flightImgContainer.appendChild(flightImg);
  
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
                    itemElementfordept.setAttribute(
                      "id",
                      "dashboard_location_name"
                    );
                    const itemElement2Inner1 = document.createElement("span");
                    itemElement2Inner1.textContent = "Departure";
                    const imgElement = document.createElement("img");
                    imgElement.src =
                      "../../assets/img/dashboard_flight_journey.png";
                    const itemElementfordest = document.createElement("div");
                    itemElementfordest.setAttribute(
                      "id",
                      "dashboard_location_name"
                    );
                    const itemElement2Inner2 = document.createElement("span");
                    itemElement2Inner2.textContent = "Destination";
  
                    const itemElement4 = document.createElement("p");
                    itemElement4.setAttribute("id", "dashboard_contact_name");
  
                    const btnContainer = document.createElement("div");
                    btnContainer.setAttribute("id", "dashboard_btn");
                    const updateBtn = document.createElement("button");
                    const deleteBtn = document.createElement("button");
  
                    // Set the hotelId as a data attribute for each button
                    updateBtn.setAttribute("updateBtn", item.id);
                    deleteBtn.setAttribute("deleteBtn", item.id);
                    deleteBtn.setAttribute("id", "dashboard_deleteBtn");
  
                    itemElement1.textContent = `Flight Name: ${item.flightname}`;
                    itemElementfordept.textContent = `${item.flightdepart}`;
                    itemElementfordest.textContent = `${item.flightdest}`;
                    itemElement4.textContent = `Contact: ${item.phoneno}`;
  
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
  
                    divContainer!.appendChild(cardContainer);
  
                    // Event listener for the update button
                    updateBtn.addEventListener("click", function () {
                      const flightId = Number(this.getAttribute("updateBtn"));
                      console.log("Update clicked for flightId:", flightId);
  
                      const updateFormDiv =
                        document.getElementById("flightFormDiv");
                      const updateForm = document.getElementById("updateFlight");
                      updateFormDiv!.style.visibility = "visible";
                      updateForm!.style.opacity = "1";
  
                      try {
                        const selectedItem = response.data.find(
                          (item:any) => item.id === flightId
                        );
                        (document.getElementById("flightname") as HTMLInputElement).value =
                          selectedItem.flightname;
                        (document.getElementById("flightdepart") as HTMLInputElement).value =
                          selectedItem.flightdepart;
                        (document.getElementById("flightdest") as HTMLInputElement).value =
                          selectedItem.flightdest;
                        (document.getElementById("economy") as HTMLInputElement).value =
                          selectedItem.economy;
                        (document.getElementById("economyrate") as HTMLInputElement).value =
                          selectedItem.economyrate;
                        (document.getElementById("business") as HTMLInputElement).value =
                          selectedItem.business;
                        (document.getElementById("businessrate") as HTMLInputElement).value =
                          selectedItem.businessrate;
                        (document.getElementById("flightwebsite") as HTMLInputElement).value =
                          selectedItem.website;
                        (document.getElementById("flightemail") as HTMLInputElement).value =
                          selectedItem.email;
                        (document.getElementById("flightphoneno") as HTMLInputElement).value =
                          selectedItem.phoneno;
  
                        updateForm!.addEventListener("submit", function (event) {
                          event.preventDefault(); // Prevent default form submission
  
                          // Get form data
                          const flightname =
                            (document.getElementById("flightname") as HTMLInputElement).value;
                          const flightdepart =
                            (document.getElementById("flightdepart") as HTMLInputElement).value;
                          const flightdest =
                            (document.getElementById("flightdest") as HTMLInputElement).value;
                          const economy =
                            (document.getElementById("economy") as HTMLInputElement).value;
                          const economyrate =
                           (document.getElementById("economyrate") as HTMLInputElement).value;
                          const business =
                            (document.getElementById("business") as HTMLInputElement).value;
                          const businessrate =
                            (document.getElementById("businessrate") as HTMLInputElement).value;
                          const website =
                            (document.getElementById("flightwebsite") as HTMLInputElement).value;
                          const email =
                            (document.getElementById("flightemail") as HTMLInputElement).value;
                          const phoneno =
                            (document.getElementById("flightphoneno") as HTMLInputElement).value;
                            const image1 = (document.getElementById("flightimage1") as HTMLInputElement | null)?.files?.[0];

  
                          // FORM VALIDATION IS NEEDED
                          const updatedFlightData = {
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
                            createdat: selectedItem.createdat,
                          };
  
                          // console.log(formData);
                          axios
                            .post(
                              "http://localhost:8000/upload/flight",
                              updatedFlightData,
                              {
                                headers: {
                                  "Content-Type": "multipart/form-data",
                                },
                              }
                            )
                            .then((response) => {
                              updatedFlightData.image1 = response.data.fileName;
                              // Send form data using Axios
                              axios
                                .put(
                                  `http://localhost:8000/flights/update/${flightId}`,
                                  updatedFlightData
                                )
                                .then((response) => {
                                  if (response.status === 200) {
                                    updateFormDiv!.style.visibility = "hidden";
                                    updateForm!.style.opacity = "0";
                                    alert("Flight updated successfully");
                                    window.location.href =
                                      "./adminDashBoard.html";
                                  }
                                })
                                .catch((error) => {
                                  console.error("Error updating flight:", error);
                                  // Handle error while trying to update the hotel
                                });
                            })
                            .catch((error) => {
                              alert("Please upload an image of the flight");
                              console.error(error);
                            });
                        });
                      } catch (error) {
                        updateFormDiv!.style.visibility = "hidden";
                        updateForm!.style.opacity = "0";
                        alert("Unauthorized request");
                        window.location.href = "./adminDashBoard.html";
                      }
                    });
  
                    // Event listener for the delete button
                    deleteBtn.addEventListener("click", function () {
                      const flightId = Number(this.getAttribute("deleteBtn"));
                      const flightIds = [flightId, userId];
                      const concatenatedIds = flightIds.join(",");
                      axios
                        .delete(
                          `http://localhost:8000/flights/delete/${concatenatedIds}`
                        )
                        .then((response) => {
                          if (response.status === 200) {
                            alert("Flight entry deleted successfully");
                          }
                          console.log(
                            `Flight with ID ${flightId} deleted successfully`
                          );
                          // this.parentNode.remove();
  
                          window.location.href = "./adminDashBoard.html";
                        })
                        .catch((error) => {
                          console.error("Error deleting flight:", error);
                          if (error.response.status === 401) {
                            alert("Unauthorized request");
                            window.location.href = "./adminDashBoard.html";
                          }
                        });
                    });
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            localStorage.removeItem("accessToken");
            window.location.href = "../login.html";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      localStorage.removeItem("accessToken");
      window.location.href = "../login.html";
    }
  });
  