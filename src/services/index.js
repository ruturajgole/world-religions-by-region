function pageLoaded() {
   updateTime();
   let [regional, global, national] = getData().map((request) => request.data);
}

function updateTime() {
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	time = hours + ":" + minutes + ":" + seconds;

	document.getElementById("time").innerHTML = time;
	setTimeout(updateTime, 1000);
}

function getData() {
	base = "http://192.168.0.20:9593/world-religions/";
	requests = [{type: "regional", url: base + "regional.json", data: []},
               {type: "global", url: base + "global.json", data: []},
	            {type: "national", url: base + "national.json", data: []}];
    
   requests.forEach((request) =>
      sendRequest(request).then((data) => request.data.push(data)));
   return requests;
}

function sendRequest(request) {
	let xmlRequestor = checkCompatibleBrowser();

   xmlRequestor.open("GET", request.url, true);
   return new Promise((resolve) => {
      xmlRequestor.onreadystatechange = () => processRequest(xmlRequestor, resolve);
      xmlRequestor.send();
   });
}

function checkCompatibleBrowser() {
   try {
      // Opera 8.0+, Firefox, Safari
      return new XMLHttpRequest();
   } catch (e) {
      // Internet Explorer Browsers
      try {
         return new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
      
         try {
            return new ActiveXObject("Microsoft.XMLHTTP");
         } catch (e) {
      
            // Something went wrong
            alert("Your browser broke!");
            return false;
         }
      }
   }
}

function processRequest(xmlRequestor, resolve) {
   if (xmlRequestor.readyState == XMLHttpRequest.DONE && xmlRequestor.status == 200) {
      resolve(xmlRequestor.responseText);
   }
}