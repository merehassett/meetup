function getJSON() {
	var apiKey = '______';
	var xhr = new XMLHttpRequest();
	xhr.open("GET", 'https://api.meetup.com/find/groups?text=women%20in%20tech&page=1&sign=true&key='+ apiKey, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var data = xhr.responseText;
			var meetup = JSON.parse(data);
			// innerText does not let the attacker inject HTML elements.
			document.getElementById("meetupImage").src = _______;
			document.getElementById("meetupName").innerText = ________;
			document.getElementById("meetupLocation").innerText = _________;
			document.getElementById("meetupCat").innerText = __________;
		}
	}
	xhr.send();
}
