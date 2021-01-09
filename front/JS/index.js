// Ce code affiche les articles postés sur la BDD avec une requete GET

request("posts", 200, "GET", null, [{key: "Authorization", value: "Bearer " + localStorage.getItem("Token")}]).then(function(data){
	for (let post of data) {
        const card = document.createElement("div");
		card.setAttribute("class","card col-6 offset-3 mb-3 align-self-center");

		const h4 = document.createElement("h4");
		h4.setAttribute("class", "mt-2");
		h4.innerHTML = "Message de " + post.by + " le " + post.createdAt;
		card.appendChild(h4);

		
		const h2 = document.createElement("h2");
		h2.setAttribute("class","card-title mt-1");
		h2.innerHTML = post.title;              //Titre du post
		card.appendChild(h2);

		const p = document.createElement("p");
		p.setAttribute("class","card-text");
		p.innerHTML = post.text;        //Texte du post
		card.appendChild(p);

		const img = document.createElement("img");
		img.setAttribute("src", post.imageUrl);  //Image du post
		img.setAttribute("class", "card-img-top mt-1 mb-3")
		card.appendChild(img);

		const list = document.getElementById("listPosts");
		list.appendChild(card);

		if (localStorage.getItem("userId") == post.userId) {

			const divbutton = document.createElement("div");
			divbutton.setAttribute("class", "mb-3");
			card.appendChild(divbutton);

			const delpost = document.createElement("button");   
			delpost.setAttribute("id", "delpost" + post.id);   // Bouton supprimer
			delpost.setAttribute("class", "btn btn-danger col-6");
			delpost.innerHTML = "Supprimer";
			divbutton.appendChild(delpost);

			const modpost = document.createElement("a");
			modpost.setAttribute("href", "modpost.html?id=" + post.id);   // Bouton Modifier
			modpost.setAttribute("class", "btn btn-warning col-6");
			modpost.innerHTML = "Modifier";
			divbutton.appendChild(modpost);

			const del = document.getElementById('delpost' + post.id);
			del.addEventListener('click', function() {    
				request("posts/" + post.id, 200, "DELETE", null, [{key: "Authorization", value: "Bearer " + localStorage.getItem("Token")}]).then(function(data){
					window.location.reload();
				}).catch((error) => {
					console.log(error);
				})
			});

		} else if (localStorage.getItem("isAdmin") === true) {

			const divbutton = document.createElement("div");
			divbutton.setAttribute("class", "mb-3");
			card.appendChild(divbutton);

			const delpost = document.createElement("button");   
			delpost.setAttribute("id", "delpost" + post.id);   // Bouton supprimer
			delpost.setAttribute("class", "btn btn-danger col-6");
			delpost.innerHTML = "Supprimer";
			divbutton.appendChild(delpost);

			const modpost = document.createElement("a");
			modpost.setAttribute("href", "modpost.html?id=" + post.id);   // Bouton Modifier
			modpost.setAttribute("class", "btn btn-warning col-6");
			modpost.innerHTML = "Modifier";
			divbutton.appendChild(modpost);

			const del = document.getElementById('delpost' + post.id);
			del.addEventListener('click', function() {    
				request("posts/" + post.id, 200, "DELETE", null, [{key: "Authorization", value: "Bearer " + localStorage.getItem("Token")}]).then(function(data){
					window.location.reload();
				}).catch((error) => {
					console.log(error);
				})
			});
		}

		const divcoms = document.createElement("div");
		divcoms.setAttribute("id","coms");

		const comstitle = document.createElement("h5");
		comstitle.innerHTML = "Commentaires";
		divcoms.appendChild(comstitle);

		card.appendChild(divcoms);

		if (localStorage.getItem("Token")) {

			const group = document.createElement("div");
			group.setAttribute("class", "input-group mb-3");

			const postcom = document.createElement("input");
			postcom.setAttribute("id","com");
			postcom.setAttribute("type","text");
			postcom.setAttribute("class","form-control");
			postcom.setAttribute("placeholder","Commentaire...");
			group.appendChild(postcom);

			const groupbtn = document.createElement("div");
			groupbtn.setAttribute("class", "input-group-append");

			const postcomsub = document.createElement("button");
			postcomsub.setAttribute("id","sendcom");
			postcomsub.setAttribute("class", "btn btn-outline-secondary");
			postcomsub.setAttribute("type", "button");
			postcomsub.innerHTML = "Envoyer";
			groupbtn.appendChild(postcomsub);
			group.appendChild(groupbtn);

			divcoms.appendChild(group);
			
		};

		const comslist = document.createElement("div");
		comslist.setAttribute("id", "comslist");
		card.appendChild(comslist);
		
	}
});

// `
// <div class='card'>
// 	<div class="card-header">
// 		<h5>${post.title}</h5>
// 	</div>
// 	<img/>
// 	<div class="card-body">
// 		<p></p>
// 	</div>
// </div>
// `