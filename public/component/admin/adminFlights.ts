import axios from 'axios';


const token = localStorage.getItem("accessToken");

if (token) {
  axios
    .get(`http://localhost:8000/parseAccessToken/${token}`)
    .then((response) => {
      const role = response.data.role;
      const userId = response.data.id;
      if (role === "admin") {
        document
          .getElementById("addFlightsForm")!
          .addEventListener("submit", function (event) {
            event.preventDefault(); 

            // Get form data
            const flightname = (document.getElementById("flightname") as HTMLInputElement).value;
            const flightdepart = (document.getElementById("flightdepart") as HTMLInputElement).value;
            const flightdest = (document.getElementById("flightdest") as HTMLInputElement).value;
            const economy = (document.getElementById("economy") as HTMLInputElement).value;
            const economyrate = (document.getElementById("economyrate") as HTMLInputElement).value;
            const business = (document.getElementById("business") as HTMLInputElement).value;
            const businessrate = (document.getElementById("businessrate") as HTMLInputElement).value;
            const website = (document.getElementById("website") as HTMLInputElement).value;
            const email = (document.getElementById("email") as HTMLInputElement).value;
            const phoneno = (document.getElementById("phoneno") as HTMLInputElement).value;
            const image1 = (document.getElementById("image1") as HTMLInputElement | null)?.files?.[0];


            // FORM VALIDATION IS NEEDED
            const formData = {
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

            axios
              .post("http://localhost:8000/upload/flight", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                formData.image1 = response.data.fileName;
                axios
                  .post("http://localhost:8000/flights/addNew", formData)
                  .then((response) => {
                    // console.log(response.status);
                    if (response.status === 200) {
                      alert("Flight registered successfully");
                      window.location.href = "./adminDashBoard.html";
                    }
                  })
                  .catch((error) => {
                    alert(`Error updating: ${error.response.data.message}`);
                  });
              })
              .catch((error) => {
                alert("Please upload an image")
                console.error(error);
              });
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
