/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'eff8e54ccf7fc80bec996bbabf661134';
const addApi = '&units=metric&APPID=';  
const feelings      = document.querySelector('#feelings');
const btnGenerate   = document.querySelector('#generate');
const txtZipCode    = document.querySelector('#zip');
const divEntryHolder= document.querySelector("#entryHolder");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const data = {};
const getDate = () => {
    const date = new Date();
    return date.toDateString();
  }







// start
function performAction(e){
    const newZip =  txtZipCode.value;
    getWeather(baseURL,newZip, addApi, apiKey)
    saveData();
    }

btnGenerate.addEventListener('click', performAction);    
// end

const getWeather = async (baseURL, newZip, addApi, apiKey)=>{

    const res = await fetch(baseURL + newZip + addApi + apiKey)
    try {
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
    }
  }
// start
  const saveData = async () => {
    data.date = getDate();
    data.feelings = feelings.value;
    data.temp = await getTemp();
    updateUI();
  }
// end  

const getTemp = async () => {
    const zip = txtZipCode.value;
    const endpoint = baseURL + zip + addApi + apiKey;
    try {
      const response = await fetch(endpoint);
      if(response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.main.temp;
      }
    } catch(error) {
      console.log(error.message);
    }
  }

  const postData = async (url = '/add', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    };
};

const updateUI = async () => {
    const request = await fetch ('/all');
    try{
        const allData = await request.json();
        date.innerHTML = 'Today is ' + data.date;
        temp.innerHTML = data.temp + '&deg;C';
        content.innerHTML = 'Feelings: ' + data.feelings;

        divEntryHolder.style.display = "block"
        txtZipCode.value = "";
        feelings.value = "";
    } catch (error){
        console.log("error", error);
    }
}