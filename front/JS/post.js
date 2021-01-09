const elt = document.getElementById('submit');

   
elt.addEventListener('click', function() {          
    
	var inputTitle = document.getElementById("title");
	var inputText = document.getElementById("text");
    var inputImageURL = document.getElementById("imageurl");
	var checkForm = true;

	inputTitle.classList.remove("error");
	inputText.classList.remove("error");

	if (!inputTitle.checkValidity()) {
		checkForm = false;
		inputTitle.classList.add("error");
	}

	if (!inputText.checkValidity()) {
		checkForm = false;
		inputText.classList.add("error");
	}

	if (checkForm) {
		
		var data = new FormData();
		var post = {
			by: localStorage.getItem("UserName"),
			title: inputTitle.value,
			text: inputText.value,
			userId: localStorage.getItem("userId")
		};

            data.append("post", JSON.stringify(post));
            data.append("imageurl", inputImageURL.files[0]);

			request("posts", 201, "POST", data, [{key: "Authorization", value: "Bearer " + localStorage.getItem("Token")}]).then(function(data){
				window.location.assign("index.html");
			}).catch((error) => {
				console.log(error);
			}
		);
	}

	

});


