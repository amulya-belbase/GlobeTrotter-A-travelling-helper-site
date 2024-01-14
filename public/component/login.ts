import axios from 'axios';

document
  .getElementById("loginForm")!
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const email = (document.getElementById("email") as HTMLInputElement)?.value || '';
    const password = (document.getElementById("password") as HTMLInputElement)?.value || '';

    const emailValidation = document.getElementById(
      "frontend_email_validation"
    );
    const passwordValidation = document.getElementById(
      "frontend_password_validation"
    );

    if (password === "") {
      passwordValidation!.style.display = "block";
      passwordValidation!.innerHTML = "Password is required";
      return;
    } else {
      passwordValidation!.style.display = "none";
    }
    // Create a data object with form values
    const formData = {
      email: email,
      password: password,
    };

    // Send form data using Axios
    axios
      .post("http://localhost:8000/users/login", formData)
      .then((response) => {
        emailValidation!.style.display = "none";
        console.log(response.data.accessToken);
        localStorage.setItem("accessToken", response.data.accessToken);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 404) {
          emailValidation!.style.display = "block";
          emailValidation!.innerHTML = "Email doesn't exist";
          return;
        } else if (error.response.status === 401) {
          emailValidation!.style.display = "block";
          emailValidation!.innerHTML = "Invalid Credentials";
        }
      });
  });
