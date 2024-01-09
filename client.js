// const axios = require('axios');

// // import axios from 'axios';

// const serverPort = 8000; // Replace with your server's port
// const serverUrl = `http://localhost:${serverPort}`; // Replace with your server's URL

// // AXIOS login POST
// // axios.post(`${serverUrl}/users/login`)
// // .then(res => {
// //   console.log(res.data);
// //   const documentEl = document.querySelector('.upper_header_right_login');
// //   documentEl.style.display = 'none';
// // })
// // .catch(error => {
// //   console.error('Error fetching data for login:', error);
// // });

// document.getElementById('loginForm').addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent default form submission
  
//   // Get form data
//   const formData = new FormData(this);

//   // Send form data using Axios
//   axios.post('http://localhost:8000/users/login', formData)
//     .then(response => {
//       console.log('Response from server:', response.data);
//       // Handle response if needed
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       // Handle error if needed
//     });
// });

// // AXIOS signup POST 
// // axios.post(`${serverUrl}/users/signup`)
// //   .then(res => {
//   //     console.log(res.data);
  
//   //   })
//   //   .catch(error => {
// //     console.error('Error fetching data for signup:', error);
// //   });
