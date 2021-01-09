const comslist = document.getElementById("comslist");

request("posts", 200, "GET", null, [{key: "Authorization", value: "Bearer " + localStorage.getItem("Token")}]).then(function(data){
	for (let com of data) {


}});