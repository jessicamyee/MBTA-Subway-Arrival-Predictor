//Comment Legend
//*This is highlighted, because it's important info
//! This is an alert
//TODO this is a todo
//? This is a question

//*API URL to see list of Subway stops (their ID, parent station) 
let stopsUrl = 'https://api-v3.mbta.com/stops?include=parent_station&filter[route_type]=1&api_key=1d4b621e1f544709887699295f22b466'


let rawList = null;

const getSubwayStops = async () => {
  try {
    let response = await axios.get(stopsUrl)
    // console.log(response)
    rawList = response.data.data
    populateDropdown(rawList);
  } catch (error) {
    console.log(error)
  }
}
getSubwayStops()


//* This is the function to retrieve the list of stations in the dropdown menu
const populateDropdown = (rawList) => {
  let select = document.querySelector('#select-station')
  rawList.forEach(stop => {
    let option = document.createElement('option')
    option.value = stop.attributes.description
    option.textContent = stop.attributes.description
    select.append(option)
  });
}

//* Given the raw list of stops and selected description (aka the station the user selects) and returns the corresponding parent station
const getParentStationFromDescr = (rawList, selectedDescription) => {
  let targetStop = null;
  //TODO: Find the stop in Rawlist where "stop.attributes.description" === dropdown value
  rawList.forEach(stop => {
    if (selectedDescription === stop.attributes.description) {
      targetStop = stop;
    }
  })
  return targetStop.relationships.parent_station.data.id;
}



const getPrediction = async (e) => {
  e.preventDefault()
  let description = document.querySelector('#select-station').value
  // console.log(description)
  let station = getParentStationFromDescr(rawList, description)
  // console.log(station)
  let predictionURL = `https://api-v3.mbta.com/predictions?filter[route_type]=1&filter[stop]=${station}&sort=direction_id&api_key=1d4b621e1f544709887699295f22b466`



  try {
    let response = await axios.get(predictionURL)
    response.data.data.forEach(prediction => {
      createPredictionBox(prediction)
    })
  } catch (error) {
    console.log(error)
  }
}

const form = document.querySelector('form')
form.addEventListener('submit', getPrediction)



let predictionSection = document.querySelector('.prediction-results')


const createPredictionBox = (prediction) => {
  let predictionBox = document.createElement('div')
  predictionSection.append(predictionBox)
  let arrivalTime = document.createElement('p')
  let routeName = document.createElement('p')
  let directionId = document.createElement('p')


  arrivalTime.value = prediction.attributes.arrival_time
  routeName.value = prediction.relationships.route.data.id
  directionId.value = prediction.attributes.direction_id



  arrivalTime.textContent = `Predicted Arrival Time: ${arrivalTime.value}`
  routeName.textContent = `Route: ${routeName.value}`
  directionId.textContent = `Direction: ${directionIdToDirectionName(directionId, routeName)}`

  predictionBox.append(arrivalTime)
  predictionBox.append(routeName)
  predictionBox.append(directionId)
}



//* Convert direction ID to direction name with purpose to be user-friendly

const directionIdToDirectionName = (directionId, routeName) => {
  if (routeName.value === 'Red' || routeName.value === 'Orange') {
    if (directionId.value === 0) {
      return 'Southbound'
    } else {
      return 'Northbound'
    }
  } else if (
    routeName.value === 'Blue' ||
    routeName.value === 'Green-B' ||
    routeName.value === 'Green-C' ||
    routeName.value === 'Green-D' ||
    routeName.value === 'Green-E') {
    if (directionId.value === 0) {
      return 'Westbound'
    } else {
      return 'Eastbound'
    }
  } else if (routeName.value === 'Mattapan') {
    if (directionId.value === 0) {
      return 'Outbound'
    } else {
      return 'Inbound'
    }
  } else {
    return 'Unknown'
  }
}


//TODO: Create the remove results function


//TODO: Convert the military time to 12-hour interval time, and ensure it's East Coast-based no matter where the browser/computer is located.
//* Should just be a general function, though the input would be a reference from the API database 


//TODO: Write function - so that the dropdown menu also has a search capability
//*This will be a generic function




//* Input consist of the predicted time. Will need to compare that against the user's computer current timestamp and determine time difference. 
//? Will I need to computer to determine the difference, or will they be able to auto-compute?



//TODO FUTURE: Create if/else logic for the Prediction. If prediction is >5 minutes away from current time, display pop-up "You still got time! But make sure you get there." If prediction is >5 minutes from current time, display pop-up "Looks like you'll need to skedaddle!" Easter egg: If you're viewing the time for the last train of the day AND it's <10 minutes away, display pop-up "Last train of the day, or you'll need to take a Lyft!"
//! Will need to make a note that the time is NOT automatically refreshed. 








