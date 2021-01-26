# Project Overview

## MBTA Subway Arrival Predictor

Link to deployed web application: PENDING

## Project Description

This web application serves Boston-area residents and visitors who choose to commute via subway. The primary feature of this is to provide a real-time prediction on when an MBTA subway will arrive at your designated station in which you will choose from a dropdown menu of station names on the webapp.

## API and Data Sample

API used: [Massachusetts Bay Transportation Authority (MBTA)](https://api-v3.mbta.com/docs/swagger/index.html#)



```JSON
{
    "data": {
        "attributes": {
            "color": "ED8B00",
            "description": "Rapid Transit",
            "direction_destinations": [
                "Forest Hills",
                "Oak Grove"
            ],
            "direction_names": [
                "South",
                "North"
            ],
            "fare_class": "Rapid Transit",
            "long_name": "Orange Line",
            "short_name": "",
            "sort_order": 10020,
            "text_color": "FFFFFF",
            "type": 1
        },
        "id": "Orange",
        "links": {
            "self": "/routes/Orange"

```

## Wireframes

![MBTA Wireframe](https://github.com/jessicamyee/MBTA-Subway-Arrival-Predictor/blob/main/MBTA%20Wireframe.png)

### MVP/PostMVP

#### MVP 
- Integration with MBTA's API to access their database of subway routes, schedules, and predicted arrival/departures
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
|Jan 26| Project Approval and Core Application Structure Set Up (HTML, CSS, etc.) | Incomplete
|Jan 27| HTML 100% done, JavaScript 50% done | Incomplete
|Jan 28| JavaScript 100% done, CSS 50% done | Incomplete
|Jan 29| CSS 100% done, MVP | Incomplete
|Feb 1| Presentations/Project Submission | Incomplete

## Priority Matrix
![Priority Matrix](https://github.com/jessicamyee/MBTA-Subway-Arrival-Predictor/blob/main/Updated%20-%20Priority%20Matrix.png)

## Timeframes


| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| General: Setting up HTML, CSS, and JS files | H | 0.5hr| 0.08hr | 0.08hr |
| HTML: Writing out the HTML semantics and plugging in image(s) | H | 2hrs| 1.5hrs | 1.5hrs |
| Pseudocode the primary feature: subway arrival prediction retrieval | H | 2hrs| 0.75hr | 0.75hr |
| Scope out the MBTA API and note down the paths to retrieve the needed data based on pseudocode | H | 3hrs| 2 | 2 |
| QA and debugging for event listeners set-up | H | 1hr|  |  |
| Integrate API for the Predictor feature and ensure data can be retrieved via console first | H | 3hrs|  |  |
| QA and debugging for API integration | H | 2hrs|  |  |
| Connect API integration with event listener to ensure text does populate on the webpage itself (Part 1) | H | 3hrs|  |  |
| Connect API integration with event listener to ensure text does populate on the webpage itself (Part 2) | H | 3hrs|  |  |
| Convert time layout from MBTA's military time to 12-hour view | H | 1hr|  |  |
| QA and debugging for API connection | H | 3hrs|  |  |
| Enable capability to remove search results upon new entry | M | 1hr|  |  |
| QA and debugging for removal of search entry | H | 1hr|  |  |
| Write out the last section of webapp - resources  | M | 1hr|  |  |
| Add MBTA's twitter feed | M | 2hrs|  |  |
| Text decoration: font style, font size, font colors | L | 2hrs|  |  |
| Using Flexbox: Elements (image, boxes) resizing and alignment | H | 3hrs|  |  |
| Non-text element decoration (submit box, etc) | L | 2hrs|  |  |
| Implementing responsive design to webapp | H | 3hrs|  |  |
| Final webapp QA | H | 2hrs|  |  |
| Total | H | 41.5hrs|  |  |

## Code Snippet

SECTION PENDING

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
N/A
