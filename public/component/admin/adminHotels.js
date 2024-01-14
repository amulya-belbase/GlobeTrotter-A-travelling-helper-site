const token = localStorage.getItem('accessToken');

if (token) {
    axios.get(`http://localhost:8000/parseAccessToken/${token}`)
        .then(response => {
            const role = response.data.role;
            const userId = response.data.id;
            if (role === 'admin') {
                document.getElementById('addHotelsForm').addEventListener('submit', function (event) {
                    event.preventDefault(); 

                    // Get form data
                    const hotelname = document.getElementById('hotelname').value;
                    const location = document.getElementById('location').value;
                    const established = document.getElementById('established').value;
                    const singleroom = document.getElementById('singleroom').value;
                    const singleroomrate = document.getElementById('singleroomrate').value;
                    const doubleroom = document.getElementById('doubleroom').value;
                    const doubleroomrate = document.getElementById('doubleroomrate').value;
                    const suite = document.getElementById('suite').value;
                    const suiterate = document.getElementById('suiterate').value;
                    const website = document.getElementById('website').value;
                    const email = document.getElementById('email').value;
                    const phoneno = document.getElementById('phoneno').value;
                    const imageInput = document.getElementById('image1');
                    const image1 = imageInput.files[0];

                    // FORM VALIDATION IS NEEDED
                    const formData = {
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
                    };

                    axios.post('http://localhost:8000/upload/hotel', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                        .then(response => {
                            formData.image1 = response.data.fileName;
                            axios.post('http://localhost:8000/hotels/addNew', formData)
                                .then(response => {
                                    // console.log(response.status);
                                    if (response.status === 200) {
                                        alert("Hotel registered successfully");
                                        window.location.href = './adminDashBoard.html';
                                    }

                                })
                                .catch(error => {
                                    if (error.response.status === 422) {
                                        // emailValidation.style.display = 'block';
                                        // emailValidation.innerHTML = "Invalid Credentials"; 
                                        alert("Enter form properly. Date format (yyyy-mm-dd), upload image");
                                    }
                                });
                        })
                        .catch(error => {
                            console.error(error);
                        });
                });
            } else {
                localStorage.removeItem('accessToken');
                window.location.href = '../login.html';
            }
        })
        .catch(error => {
            console.log(error)
        })

} else {
    localStorage.removeItem('accessToken');
    window.location.href = '../login.html';
}