//COMMENT LEGEND: VS Code Extension (BetterComment) was used 

//! Main Function
//* Sub-Function or Independent Function
//General Comment






// API URL to see list of Subway stops (their ID, parent station) 
let stopsUrl = 'https://api-v3.mbta.com/stops?include=parent_station&filter[route_type]=0,1&api_key=1d4b621e1f544709887699295f22b466'


//! Main Function (MF) 1 to TRIGGER dropdown menu of stations using data from the stopsURL API database
let rawList = null;

const getSubwayStops = async () => {
  try {
    let response = await axios.get(stopsUrl)
    rawList = response.data.data
    let alphaSortedStopsList = rawList.sort((a, b) => (a.attributes.description > b.attributes.description) ? 1 : -1);
    populateDropdown(alphaSortedStopsList);
  } catch (error) {
    console.log(error)
  }
}
getSubwayStops()


//* Sub-function for MF1: to populate the list of stations in the dropdown menu
const populateDropdown = (alphaSortedStopsList) => {
  let select = document.querySelector('#select-station')
  alphaSortedStopsList.forEach(stop => {
    let option = document.createElement('option')
    option.value = stop.attributes.description
    option.textContent = stop.attributes.description
    select.append(option)
  });
}




//! Main Function 2: This will trigger the command to retrieve predictions using the predictionURL API database
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


//* Sub-function for MF2: Given the station the user selects, return the corresponding parent station
const getParentStationFromDescr = (rawList, selectedDescription) => {
  let targetStop = null;
  rawList.forEach(stop => {
    if (selectedDescription === stop.attributes.description) {
      targetStop = stop;
    }
  })
  return targetStop.relationships.parent_station.data.id;
}


//* Independent Function: Add event listener to the submit button
const submit = document.querySelector('form')
submit.addEventListener('submit', getPrediction)



//* Sub-function for MF2: Create the box of prediction results
let predictionSection = document.querySelector('.prediction-results')

const createPredictionBox = (prediction) => {
  let predictionBox = document.createElement('div')
  predictionSection.append(predictionBox)
  let arrivalTime = document.createElement('p')
  let routeName = document.createElement('p')
  let directionId = document.createElement('p')

  arrivalTime.className = 'classArrivalTime'
  routeName.className = 'classRouteName'
  directionId.className = 'classDirectionId'

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




//* Sub-function for MF2: Sorting function for sorting the prediction boxes. Priority to sort (route, then direction, then arrival time)
const sortPredictionFunction = (predictionA, predictionB) => {
  return predictionA.relationships.route.data.id.localeCompare(predictionB.relationships.route.data.id) ||
    predictionA.attributes.direction_id - predictionB.attributes.direction_id ||
    moment(predictionA.attributes.arrival_time) - moment(predictionB.attributes.arrival_time)
}




//* Sub-function for MF2: Convert direction ID to direction name with purpose to be user-friendly

const directionIdToDirectionName = (directionId, routeName) => {
  if (routeName.value === 'Red' || routeName.value === 'Orange') {
    if (directionId.value === 0) {
      return 'Southbound'
    } else {
      return 'NORTHbound'
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
      return 'EASTbound'
    }
  } else if (routeName.value === 'Mattapan') {
    if (directionId.value === 0) {
      return 'Outbound'
    } else {
      return 'INbound'
    }
  } else {
    return 'Unknown'
  }
}


//* Sub-function for MF2: Remove prediction results when you search for a new prediction
const removePredictionDisplays = () => {
  let div = document.querySelector('.prediction-results')
  while (div.lastChild) {
    div.removeChild(div.lastChild)
  }
}




//* Independent Function: Add event listeners to the reset button to remove results and reset the search bar
const reset = document.querySelector('#reset-button')
reset.addEventListener("click", removePredictionDisplays);

reset.addEventListener("click", () => {
  document.querySelector('form').reset();
})




//*Sub-function for MF2: This function converts the military date/time format to standard time
const convertMilitaryToStandardTime = (originalDateTime) => {
  return moment(originalDateTime).format('MMMM Do YYYY, h:mm a')
}


//* Independent Function: Add event listeners to the resource buttons

const navigateToSubwaySchedule = () => {
  window.open('https://www.mbta.com/schedules/subway', '_blank')
};
const navigateToBusSchedule = () => {
  window.open('https://www.mbta.com/schedules/bus', '_blank')
};
const navigateToStationInfo = () => {
  window.open('https://www.mbta.com/stops/subway', '_blank')
};

document.querySelector('#subway-schedule').addEventListener('click', navigateToSubwaySchedule);
document.querySelector('#bus-schedule').addEventListener('click', navigateToBusSchedule);
document.querySelector('#station-info').addEventListener('click', navigateToStationInfo);











