const suppr = document.getElementById("suppr");
var param = new URLSearchParams(window.location.search);
var id = param.get("id");

suppr.addEventListener('click', function() {
    window.location.assign("suppr.html?id=" + localStorage.getItem("userId"));
});

const oui = document.getElementById("oui");
const non = document.getElementById("non");

oui.addEventListener('click', function() {
    request("auth/users/" + id, 200, "DELETE", null, [{key: "Authorization", value: "Bearer " + localStorage.getItem("Token")}] ).then(function(data){
        localStorage.removeItem("Token");
        localStorage.removeItem("userId");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("UserName");
        window.location.assign("index.html");
    }).catch((error) => {
        console.log(error);
    }
    );
});

non.addEventListener('click', function() {
    window.location.assign("index.html");
});