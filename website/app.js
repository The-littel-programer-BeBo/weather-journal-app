// The URL to get weather information from his API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API, and add =metric to get temperature with celsius
const apiKey = ',&appid=e441852bef51b7b28b216c6782ff16d7&units=metric';
// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.toDateString();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',generateWether);

// Function called by event listener
function generateWether(e){
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings');
  // get data from api
  getWetherDemo(baseURL,zipCode,apiKey)
  .then((data)=>{
    console.log(data)
  // post data to server
    postData('/add',{
      temp:data.main.temp,
      country:data.name,
      date:newDate,
      description:data.weather[0].description,
      content:feelings.value,})
  // update page with new data
    updateUI();
  })  
};

// function to get data from api
const getWetherDemo= async(baseURL,zipCode,apiKey)=>{
  const res = await fetch (baseURL+zipCode+apiKey);
  try {
    const data = await res.json();
      if (data.cod != '200'){
        let error = document.getElementById('error');
        error.innerHTML = data.message;
        error.classList.add('show-error');
        document.querySelector('.entry').classList.remove('show')
        setTimeout(() => {
          error.classList.remove('show-error')
      }, 2000)};
    console.log(data)
    return data;
  }catch (error){
    console.log('error',error)
  }
} 
// function to post data to server
const postData = async ( url = '', data = {})=>{
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
    return newData;
  }catch(error) {
  console.log("error", error);
}
};
// function to update page with new data
const updateUI = async (url='/all') =>{ 
const request = await fetch(url);
try {
const newEntry = await request.json()
document.getElementById('temp').innerHTML = `${Math.round(newEntry.temp)}&deg;C`;
document.getElementById('date').innerHTML = `${newEntry.date}`;
document.getElementById('content').innerHTML = `${newEntry.content}`;
document.getElementById('description').innerHTML = `${newEntry.description}`;
document.getElementById('country').innerHTML = `${newEntry.country}`;
document.querySelector('.entry').classList.add('show')
}
catch(error) {
  console.log("error", error);
}};
