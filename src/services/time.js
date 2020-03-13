function updateTime() {
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	time = hours + ":" + minutes + ":" + seconds;

	document.getElementById("time").innerHTML = time;
	setTimeout(updateTime, 1000);
}