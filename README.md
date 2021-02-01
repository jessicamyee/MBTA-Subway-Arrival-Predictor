# Project Overview

## MBTA Subway Arrival Predictor

Link to deployed web application: PENDING

## Project Description

This web application serves Boston-area residents and visitors who choose to commute via subway. The primary feature of this is to provide a real-time prediction on when an MBTA subway will arrive at your designated station in which you will choose from a dropdown menu of station names on the webapp.

## API and Data Sample

API used: [Massachusetts Bay Transportation Authority (MBTA)](https://api-v3.mbta.com/docs/swagger/index.html#)



```JSON
{
    "data": [
        {
            "attributes": {
                "address": null,
                "at_street": null,
                "description": "Cleveland Circle - Green Line - Park Street & North",
                "latitude": 42.336252,
                "location_type": 0,
                "longitude": -71.148774,
                "municipality": "Boston",
                "name": "Cleveland Circle",
                "on_street": null,
                "platform_code": null,
                "platform_name": "Park Street & North",
                "vehicle_type": 0,
                "wheelchair_boarding": 1
            },
            "id": "70238",
            "links": {
                "self": "/stops/70238"
            },
            "relationships": {
                "child_stops": {},
                "facilities": {
                    "links": {
                        "related": "/facilities/?filter[stop]=70238"
                    }
                },
                "parent_station": {
                    "data": {
                        "id": "place-clmnl",
                        "type": "stop"
                    }
                },
                "recommended_transfers": {},
                "zone": {
                    "data": {
                        "id": "RapidTransit",
                        "type": "zone"
                    }
                }
            },
            "type": "stop"
        },

```

## Wireframes

![MBTA Wireframe](https://github.com/jessicamyee/MBTA-Subway-Arrival-Predictor/blob/main/MBTA%20Wireframe.png)

### MVP/PostMVP

#### MVP 
- Integration with MBTA's API to access their database of predicted subway arrivals
- Ability to input a Boston-area subway station name and the output would be the prediction in which the subway will arrive at that station
- Provide a static map of the subway routes.

#### PostMVP  
- Ability to search for subway schedules (this is different from Subway prediction, as prediction is real-time)
- Include real-time service alerts particularly pertaining to the subway line the user has selected 
- Ability to view available amenities at designated stations (e.g. elevator access)
- Expand to predicting for bus routes


## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Jan 25-26| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|Jan 26| Project Approval and Core Application Structure Set Up (HTML, CSS, etc.) | Complete
|Jan 27| HTML 100% done, JavaScript 50% done | Complete
|Jan 28| JavaScript 100% done, CSS 50% done | Complete
|Jan 29| CSS 100% done, MVP | Complete
|Feb 1| Presentations/Project Submission | Incomplete

## Priority Matrix
![Priority Matrix](https://github.com/jessicamyee/MBTA-Subway-Arrival-Predictor/blob/main/Updated%20-%20Priority%20Matrix.png)

## Timeframes


| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| General: Setting up HTML, CSS, and JS files | H | 0.5hr| 0.08hr | 0.08hr |
| HTML: Writing out the HTML semantics and plugging in image(s) | H | 2hrs| 1.5hrs | 1.5hrs |
| Pseudocode the primary feature: subway arrival prediction retrieval | H | 2hrs| 0.75hr | 0.75hr |
| Scope out the MBTA API and note down the paths to retrieve the needed data based on pseudocode | H | 3hrs| 4hrs | 4hrs |
| QA and debugging for event listeners set-up | H | 1hr| 0.5hr | 0.5hr |
| Integrate API for the Predictor feature and ensure data can be retrieved via console first | H | 3hrs| 2hrs | 2hrs |
| QA and debugging for API integration | H | 2hrs| 1hr | 1hr |
| Connect API integration with event listener to ensure text does populate on the webpage itself (Part 1) | H | 3hrs| 3.5hrs | 3.5hrs |
| Connect API integration with event listener to ensure text does populate on the webpage itself (Part 2) | H | 3hrs| 3hrs | 3hrs |
| Convert time layout from MBTA's military time to 12-hour view | H | 1hr| 1hr | 1hr |
| QA and debugging for API connection | H | 3hrs| 0.25hr | 0.25hr |
| Enable capability to remove search results upon new entry | M | 1hr| 0.17hr | 0.17hr |
| QA and debugging for removal of search entry | H | 1hr| 1hr | 1hr |
| Write out the last section of webapp - resources  | M | 1hr| 0.5hr | 0.5hr |
| Add MBTA's twitter feed | M | 2hrs| 0.5hr | 0.5hr |
| Text decoration: font style, font size, font colors | L | 2hrs| 2.5hrs | 2.5hrs |
| Using Flexbox: Elements (image, boxes) resizing and alignment | H | 3hrs| 2.5hrs | 2.5hrs |
| Non-text element decoration (submit box, etc) | L | 2hrs| 4hrs | 4hrs |
| Implementing responsive design to webapp | H | 3hrs| 3hrs | 3hrs |
| Final webapp QA | H | 2hrs| 1hr | 1hr |
| Total | H | 41.5hrs| 32.75hrs | 32.75hrs |

## Code Snippet

```
const sortPredictionFunction = (predictionA, predictionB) => {
  return predictionA.relationships.route.data.id.localeCompare(predictionB.relationships.route.data.id) ||
    predictionA.attributes.direction_id - predictionB.attributes.direction_id ||
    moment(predictionA.attributes.arrival_time) - moment(predictionB.attributes.arrival_time)
}
```
This was my proudest code snippet of the MVP because this allowed me to explore more of sorting. I've always been used to just sorting under 1 criteria, but sorting by 3 criteria forced me to think beyond the algorithm to strategically brainstorm on how the prediction results should be ordered and displayed. 

## Change Log
- Visual design of webapp changed slightly (compared to the initial wireframe) due to a better cohesive visual experience.

