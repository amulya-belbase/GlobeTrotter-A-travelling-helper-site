document.getElementById('signUpForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const dateofbirth = document.getElementById('birthday').value;
    const gender = document.getElementById('gender').value;
    const profilepicInput = document.getElementById('profilepic');
    const profilepic = profilepicInput.files[0]; 
    const role = document.getElementById('role').value;


    // Get validation elements
    const emailValidation = document.getElementById("frontend_email_validation");
    const passwordValidation = document.getElementById("frontend_password_validation");
    const firstnameValidation = document.getElementById("frontend_firstname_validation");
    const lastnameValidation = document.getElementById("frontend_lastname_validation");
    const genderValidation = document.getElementById("frontend_gender_validation");
    const roleValidation = document.getElementById("frontend_role_validation");
    const birthdayValidation = document.getElementById("frontend_birthday_validation");

    if(password === ''){
        passwordValidation.style.display = 'block';
        passwordValidation.innerHTML = "Password is required";
        return;
    }else{
        passwordValidation.style.display = 'none';
    }
    if(firstname === ''){
        firstnameValidation.style.display = 'block';
        firstnameValidation.innerHTML = "Firstname is required";
        return;
    }else{
        firstnameValidation.style.display = 'none';
    }
    if(lastname === ''){
        lastnameValidation.style.display = 'block';
        lastnameValidation.innerHTML = "Lastname is required";
        return;
    }else{
        lastnameValidation.style.display = 'none';
    }
    if(gender === '#'){
        genderValidation.style.display = 'block';
        genderValidation.innerHTML = "Gender is required";
        return;
    }else{
        genderValidation.style.display = 'none';
    }
    if(role === '#'){
        roleValidation.style.display = 'block';
        roleValidation.innerHTML = "Role is required";
        return;
    }else{
        roleValidation.style.display = 'none';
    }
    if(dateofbirth === ''){
        birthdayValidation.style.display = 'block';
        birthdayValidation.innerHTML = "Date Of Birth is required";
        return;
    }else{
        birthdayValidation.style.display = 'none';
    }

    // Create a data object with form values
    const formData = {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        dateofbirth: dateofbirth,
        gender: gender,
        profilepic: profilepic,
        role: role
    };
        axios.post('http://localhost:8000/upload/user', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            formData.profilepic = response.data.fileName;
            axios.post('http://localhost:8000/users/signup', formData)
                .then(response => {
                    emailValidation.style.display = 'none';

                    if (response.status === 200) {
                        // console.log(response.data[0].id, response.data[0].firstname);
                        alert("User registration successful");
                        window.location.href = './login.html'; // Replace '/dashboard' with your desired page
                    } else {
                        console.log(response);
                    }
                })
                .catch(error => {
                    console.log(error.response.status)
                    if(error.response.status === 422){
                        emailValidation.style.display = 'block';
                        emailValidation.innerHTML = "User already exists";   
                        return;  
                    }
                });
        })
        .catch(error => {
            console.error(error);
        });
});
