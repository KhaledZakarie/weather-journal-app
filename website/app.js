// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?id=';
const apiKey = '&appid=79282cac845a31a69ce3bd82e5050999&units=imperial';

 // Create a new date instance dynamically with JS
 let d = new Date();
 let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Global Variables */
document.getElementById('generate').addEventListener('click', generate);

function generate(e){
   
    //get elements
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    
    //call async functions
    getApiData(baseURL + zip + apiKey)
    .then(function(temp){
        postData('/addData', {
            temperature: temp,
            date: newDate,
            userResponse: feelings
        });

        updateUI();
    })
}


//fetch data from OpenWeatherMap API
const getApiData = async (url =baseURL + zip + apiKey)=>{
    const res = await fetch(url)
    try{
        const data = await res.json();
        console.log(data.list[0].main.temp);
        return (data.list[0].main.temp);
    }catch(error){
        console.log('error', error);
    }
}

//post data to the server
const postData = async (url= '', data={})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const data = response.json();
        return data;
    }catch(error){
        console.log('error',error);
    }
}

//async function for update UI
const updateUI = async () => {
    const request = await fetch('/tempertureData');
    try{
      const allData = await request.json();
      console.log(allData);
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temperature;
      document.getElementById('content').innerHTML = allData.userResponse;
  
    }catch(error){
      console.log("error", error);
    }
  }