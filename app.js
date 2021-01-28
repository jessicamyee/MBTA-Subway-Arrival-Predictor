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
  let station = getParentStationFromDescr(rawList, description)
  let predictionURL = `https://api-v3.mbta.com/predictions?filter[route_type]=1&filter[stop]=${station}&sort=direction_id&sort=time&api_key=1d4b621e1f544709887699295f22b466`
  removePredictionDisplays()
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


  arrivalTime.value = convertMilitaryToStandardTime(prediction.attributes.arrival_time)
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


//*This function removes prediction results when you search for a new prediction
const removePredictionDisplays = () => {
  let div = document.querySelector('.prediction-results')
  while (div.lastChild) {
    div.removeChild(div.lastChild)
  }
}


//*This function converts the military date/time format to standard time
const convertMilitaryToStandardTime = (originalDateTime) => {
  return moment(originalDateTime).format('MMMM Do YYYY, h:mm a')
}



//TODO EXTRA: Write function - so that the dropdown menu also has a search capability
//*This will be a generic function











