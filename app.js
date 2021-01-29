//Comment Legend
//*This is highlighted, because it's important info
//! This is an alert
//TODO this is a todo
//? This is a question


//*API URL to see list of Subway stops (their ID, parent station) 
let stopsUrl = 'https://api-v3.mbta.com/stops?include=parent_station&filter[route_type]=0,1&api_key=1d4b621e1f544709887699295f22b466'


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
  rawList.forEach(stop => {
    if (selectedDescription === stop.attributes.description) {
      targetStop = stop;
    }
  })
  return targetStop.relationships.parent_station.data.id;
}


//* This will trigger the command to retrieve predictions
const getPrediction = async (e) => {
  e.preventDefault()
  let description = document.querySelector('#select-station').value
  let station = getParentStationFromDescr(rawList, description)
  let predictionURL = `https://api-v3.mbta.com/predictions?filter[route_type]=0,1&filter[stop]=${station}&sort=time&api_key=1d4b621e1f544709887699295f22b466`
  removePredictionDisplays()
  try {
    let response = await axios.get(predictionURL)
    rawPredictionList = response.data.data;

    let filteredList = rawPredictionList.filter(prediction => {
      let hasArrivalTime = prediction.attributes.arrival_time !== null;
      let isAfterNow = moment(prediction.attributes.arrival_time).isAfter(moment());
      return hasArrivalTime && isAfterNow;
    });

    let sortedFilteredList = filteredList.sort(sortPredictionFunction);

    sortedFilteredList.forEach(prediction => {
      createPredictionBox(prediction)
    })
  } catch (error) {
    console.log(error)
  }
}

//* Add event listener to the submit button
const form = document.querySelector('form')
form.addEventListener('submit', getPrediction)





//* Function to create the box of prediction results
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



  arrivalTime.textContent = `Arrival Time: ${arrivalTime.value}`
  routeName.textContent = `Route: ${routeName.value}`
  directionId.textContent = `Direction: ${directionIdToDirectionName(directionId, routeName)}`

  predictionBox.append(arrivalTime)
  predictionBox.append(routeName)
  predictionBox.append(directionId)
}


//* Sorting function for sorting the prediction boxes. Priority to sort (route, then direction, then arrival time)
const sortPredictionFunction = (predictionA, predictionB) => {
  return predictionA.relationships.route.data.id.localeCompare(predictionB.relationships.route.data.id) || predictionA.attributes.direction_id - predictionB.attributes.direction_id || moment(predictionA.attributes.arrival_time) - moment(predictionB.attributes.arrival_time)
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











