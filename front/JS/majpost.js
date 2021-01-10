const modelt = document.getElementById('modsubmit');
var param = new URLSearchParams(window.location.search);
var id = param.get("id");

window.addEventListener("load", function () {
	var inputTitle = document.getElementById("title");
	var inputText = document.getElementById("text");
	const title = localStorage.getItem("title");
	const text = localStorage.getItem("text");
	inputTitle.setAttribute("value", title);
	inputText.setAttribute("value", text);
})


modelt.addEventListener('click', function () {

	var inputTitle = document.getElementById("title");
	var inputText = document.getElementById("text");
	var inputImageURL = document.getElementById("imageurl");
	var userId = localStorage.getItem("postUserId");

	var data = new FormData();
	var updtpost = {
		title: inputTitle.value,
		text: inputText.value,
		id: id,
		userId: userId
	};

	data.append("post", JSON.stringify(updtpost));
	data.append("imageurl", inputImageURL.files[0]);

	request("posts/" + id, 201, "PUT", data, [{ key: "Authorization", value: "Bearer " + localStorage.getItem("Token") }]).then(function (data) {
		localStorage.removeItem("title");
		localStorage.removeItem("text");
		localStorage.removeItem("postUserId");
		window.location.assign("index.html");
	}).catch((error) => {
		console.log(error);
	}
	);

});