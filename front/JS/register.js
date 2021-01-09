const elt = document.getElementById('submit');

   
elt.addEventListener('click', function() {          
    
	var inputLName = document.getElementById("lname");
	var inputFName = document.getElementById("fname");
    var inputEmail = document.getElementById("email");
	var inputPass = document.getElementById("password");
	var checkForm = true;

	inputLName.classList.remove("error");
	inputFName.classList.remove("error");
	inputEmail.classList.remove("error");
	inputPass.classList.remove("error");

	if (!inputLName.checkValidity()) {
		checkForm = false;
		inputLName.classList.add("error");
	}

	if (!inputFName.checkValidity()) {
		checkForm = false;
		inputFName.classList.add("error");
	}

	if (!inputEmail.checkValidity()) {
		checkForm = false;
		inputEmail.classList.add("error");
	}

	if (!inputPass.checkValidity()) {
		checkForm = false;
		inputPass.classList.add("error");
	}

	if (checkForm) {
		var user = {
				fName: inputFName.value,
				lName: inputLName.value,
				email: inputEmail.value,
				password: inputPass.value
			};

			request("auth/signup", 201, "POST", JSON.stringify(user),[{key: "Content-Type", value: "application/json"}] ).then(function(data){
                localStorage.setItem("Token", data.token);
				localStorage.setItem("userId", data.userId);
				localStorage.setItem("isAdmin", data.isAdmin);
				localStorage.setItem("UserName", data.fname + " " + data.lname);
                window.location.assign("index.html");
			}).catch((error) => {
				console.log(error);
			}
			);
	}

	

});

