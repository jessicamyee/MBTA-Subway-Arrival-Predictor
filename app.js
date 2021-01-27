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
  let predictionURL = `https://api-v3.mbta.com/predictions?filter[stop]=${station}&api_key=1d4b621e1f544709887699295f22b466`
  try {
    let response = await axios.get(predictionURL)
    console.log(response)
    //TODO: Code to create DOM elements to display prediction time, route, direction
    // getArrivalTime()
    // getRouteName()
    // getDirectionId()
  } catch (error) {
    console.log(error)
  }
}

const form = document.querySelector('form')
form.addEventListener('submit', getPrediction)




// //! Create function that loops through all prediction results to retrieve the prediction time

// let predictionSection = document.querySelector('.prediction-results')
// let rawPredictionList = response.data.data


// const getArrivalTime = (rawPredictionList) => {
//   rawPredictionList.forEach(prediction => {
//     let arrivalTime = document.createElement('p')
//     arrivalTime.value = attributes.arrival_time
//     arrivalTime.textContent = attributes.arrival_time
//     predictionSection.append(arrivalTime)
//   })
// }

// //! Create function that loops through all prediction results to retrieve the route name
// const getRouteName = (rawPredictionList) => {
//   rawPredictionList.forEach(prediction => {
//     let routeName = document.createElement('p')
//     routeName.value = relationships.route.data.id
//     routeName.textContent = relationships.route.data.id
//     predictionSection.append(routeName)
//   })
// }

// //! Create function that loops through all prediction results to retrieve the direction id
// const getDirectionId = (rawPredictionList) => {
//   rawPredictionList.forEach(prediction => {
//     let directionId = document.createElement('p')
//     directionId.value = attributes.direction_id
//     directionId.textContent = attributes.direction_id
//     predictionSection.append(directionId)
//   })
// }




// //TODO: Part 3 - Return only the first 2 sets of prediction times



// //TODO: Part 4 - Create nested conditional logic that would show direction in plain English

// //*some pseudocoding here, because unsure what the route ID name is. Is it routeName.value?


// if (route_id === 'Red' || route_id === 'Orange') {
//   if (direction_id === 0) {
//     //TODO: Display "Southbound"
//   } else {
//     //TODO: Display "Northbound"
//   }
// } else if (
//   route_id === 'Blue' ||
//   route_id === 'Green-B' ||
//   route_id === 'Green-C' ||
//   route_id === 'Green-D' ||
//   route_id === 'Green-E') {
//   if (direction_id === 0) {
//     //TODO: Display "Westbound"
//   } else {
//     //TODO: Display "Eastbound"
//   }
// } else (route_id === 'Mattapan') {
//   if (direction_id === 0) {
//     //TODO: Display "Outbound"
//   } else {
//     //TODO: Display "Inbound"
//   }
// }












//TODO: Convert the military time to 12-hour interval time, and ensure it's East Coast-based no matter where the browser/computer is located.
//* Should just be a general function, though the input would be a reference from the API database 




//* Input consist of the predicted time. Will need to compare that against the user's computer current timestamp and determine time difference. 
//? Will I need to computer to determine the difference, or will they be able to auto-compute?



//TODO: Create if/else logic for the Prediction. If prediction is >5 minutes away from current time, display pop-up "You still got time! But make sure you get there." If prediction is >5 minutes from current time, display pop-up "Looks like you'll need to skedaddle!" Easter egg: If you're viewing the time for the last train of the day AND it's <10 minutes away, display pop-up "Last train of the day, or you'll need to take a Lyft!"
//! Will need to make a note that the time is NOT automatically refreshed. 










//TODO: DOM create element -- a second <p> tag is created that will display the second prediction. 
//! Prediction to include: Time, Station, Directionality, Reference that this is the  prediction for the subway following the first.


//TODO: Write function - so that the dropdown menu also has a search capability
//*This will be a generic function