const token = localStorage.getItem("accessToken");

if (token) {
  axios
    .get(`http://localhost:8000/parseAccessToken/${token}`)
    .then((response) => {
      const role = response.data.role;
      const userId = response.data.id;
      if (role === "admin") {
        document
          .getElementById("addFlightsForm")
          .addEventListener("submit", function (event) {
            event.preventDefault(); 

            // Get form data
            const flightname = document.getElementById("flightname").value;
            const flightdepart = document.getElementById("flightdepart").value;
            const flightdest = document.getElementById("flightdest").value;
            const economy = document.getElementById("economy").value;
            const economyrate = document.getElementById("economyrate").value;
            const business = document.getElementById("business").value;
            const businessrate = document.getElementById("businessrate").value;
            const website = document.getElementById("website").value;
            const email = document.getElementById("email").value;
            const phoneno = document.getElementById("phoneno").value;
            const imageInput = document.getElementById("image1");
            const image1 = imageInput.files[0];

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
                    if (error.response.status === 422) {
                      // emailValidation.style.display = 'block';
                      // emailValidation.innerHTML = "Invalid Credentials";
                      alert("Enter form properly. upload image");
                    }
                  });
              })
              .catch((error) => {
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
