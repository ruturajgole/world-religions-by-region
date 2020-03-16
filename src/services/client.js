async function requestData(request) {
   response = await getRequestResponse(request);
   return response[0].data;
}

async function getRequestResponse(request) {
	base = "http://192.168.0.20:9593/world-religions/";
   requests = [{type: "global", url: base + "global.json", data: []},
               {type: "regional", url: base + "regional.json", data: []},
               {type: "national", url: base + "national.json", data: []},
              ];
   
   const getData = async (item) => {
      return Promise.resolve({ ...item, data: await sendRequest(item)});
   }

   requests = requests.filter((item) => item.type == request.type);
   
   response = await Promise.all(requests.map((item) => getData(item)));

   return new Promise((resolve) =>
      resolve(response));
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
      return new XMLHttpRequest();
   } catch (e) {
      try {
         return new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
      
         try {
            return new ActiveXObject("Microsoft.XMLHTTP");
         } catch (e) {
      
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
