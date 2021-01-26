//Comment Legend
//*This is highlighted, because it's important info
//! This is an alert
//TODO this is a todo
//? This is a question



//TODO: Create event listener/handler -- User clicks onto the dropdown to see a list of the stations 

//?How can we populate just the names of the stations? Can we just easily retrieve and populate the stations names (1) or will we need to embed (in the HTML) a "Station Key" that tells the user which ID number to select corresponding to the right station (2)?
//* For (1): 



//* For (2):




//TODO: Write function - so that the dropdown menu also has a search capability
//*This will be a generic function



//TODO: Create event listener/handler -- User clicks on the "Submit" button and the submission will be the "searcher" in the API database 

//? How does selecting the item TALK to the API database to pull the correct information.



//TODO: DOM create element -- a <p> tag is created that will display the first prediction. Prediction time will be stored in a variable inside the <p> tag
//! Prediction to include: Time, Station, Directionality, Reference that this is the soonest prediction




//TODO: DOM create element -- a second <p> tag is created that will display the second prediction. 
//! Prediction to include: Time, Station, Directionality, Reference that this is the  prediction for the subway following the first.



//TODO: Convert the military time to 12-hour interval time, and ensure it's East Coast-based no matter where the browser/computer is located.
//* Should just be a general function, though the input would be a reference from the API database 


//TODO: Create if/else logic for the Prediction. If prediction is >5 minutes away from current time, display pop-up "You still got time! But make sure you get there." If prediction is >5 minutes from current time, display pop-up "Looks like you'll need to skedaddle!" Easter egg: If you're viewing the time for the last train of the day AND it's <10 minutes away, display pop-up "Last train of the day, or you'll need to take a Lyft!"
//! Will need to make a note that the time is NOT automatically refreshed. 

//* Input consist of the predicted time. Will need to compare that against the user's computer current timestamp and determine time difference. 
//? Will I need to computer to determine the difference, or will they be able to auto-compute?
