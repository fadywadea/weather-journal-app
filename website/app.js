/* Global Variables */
// Personale API Key for OpenWeatherMap API
const apiKey = "&appid=75ef7eed0299c4a74b11e257073d0463&units=imperial";
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='; 

const dateNumber = document.getElementById('date');
const tempNumber = document.getElementById('temp');
const contentText = document.getElementById('content');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'/'+ d.getDate()+'/'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', actionsTaken);

/* Function called by event listener */
function takingactions(e){
    const newZipCode = document.getElementById('zip').value;
    getZip(baseURL,newZipCode,apiKey);
}

/* Function to GET Web API Data*/
    async function sendData (url='', data= {}){
        console.log("sending data using POST method ..", data);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        });
        
    try {
        const newData = await response.json();
        console.log("Server respond with this data [post request]: ", newData);
        return newData;
    }catch (error){
        console.log("error", error);
    }           
};

/* Function to POST data */
function actionsTaken(e){
    const newZipCode = document.getElementById('zip').value;
    const feelingsText= document.getElementById('feelings').value;

/* Function to GET Project Data */ 
    const getZip = async(baseURL,zip,key)=>{
        const response = await fetch(baseURL+zip+key)
        try{
            const data = await response.json();
            console.log(data)
            return data;
        }catch (error){
            console.log("error", error)
        }
    };
    
    getZip(baseURL,newZipCode,apiKey)
    .then(function(data){
        console.log(data);
        if (data.cod != 200){
            alert(data.message);
            return false;
        }
        sendData("/add", {  
            temp: data.main.temp,
            date: newDate,
            content: feelingsText
        });
    })
    .then(()=>updateUI())
};
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    }
    catch(error){
        console.log("error",error);
    }
}