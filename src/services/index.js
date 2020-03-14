async function pageLoaded() {
   updateTime();
   responses = await getRequestResponses();
   data = extractData(responses);
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

function extractData(responses) {
   data = {global: [], regional: [], national: []};

   responses.map((response) => {
      switch(response.type) {
         case "global":
            data.global = response.data;
         case "regional":
            data.regional = response.data;
         case "national":
            data.national = response.data;
      }
   });

   return data;
}

async function getRequestResponses() {
	base = "http://192.168.0.20:9593/world-religions/";
   requests = [{type: "global", url: base + "global.json", data: []},
               {type: "regional", url: base + "regional.json", data: []},
               {type: "national", url: base + "national.json", data: []},
              ];
   
   const getData = async item => {
      return Promise.resolve({ ...item, data: await sendRequest(item)});
   }
   
   responses = await Promise.all(requests.map(item => getData(item)));
   
   return new Promise((resolve) =>
      resolve(responses));
}

async function sendRequest(request) {
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
      resolve(JSON.parse(xmlRequestor.responseText));
   }
}
