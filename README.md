# incidents-analytics

This app is based on a prompt provided while interviewing for a software engineer role. The requirement was to create a web app which could accept an uploaded JSON file describing an incident to which emergency responders were dispatched. Upon uploading a file, it should display a map with the location of the incident, as well as some metadata such as the weather. Time spent developing this project was approximately 4 hours.

Prerequisites
-------------
* Node (developed using v20.17.0)
* NPM (developed using v10.8.2)

Running
-------
1. Run `npm install`
2. Run `npm run dev`
3. Open `http://localhost:3000` in a web browser (developed using Firefox)
    * Use the HTML file upload input to upload JSON incident file
    * Map can be panned and zoomed like a standard web map
    * Clicking the marker on the map will show more details on the address
    * 'X' button next to the file name will clear all data to allow another file to be uploaded

Notes/Comments
--------------
* A significant chunk of my time was spent going down a bit of a rabbit hole on selecting the source for weather data. I did initially try the recommended API (https://dev.meteostat.net/), but found that, when I tried subscribing on RapidAPI, I would always receive 401 with no explanation (I was logged in with my Google account). The second one I tried was https://openweathermap.org/, but discovered that, while current weather data was available for free, their historical weather data API required a paid subscription. After that I ended up with https://open-meteo.com/.

Future Development Ideas
------------------------
* Needless to say, it could be a whole lot prettier. MaterialUI is a common library I like to bring in to spice up UI components, so at the very least that could make it look a little less ugly.
* With a little more time, I would've loved to have added some unit tests, particularly to the JSON parsing logic and the response handling for the weather API.
* I would definitely want error handling. Uploading a JSON file with unexpected structure would almost certainly break everything without a terrible helpful message to the user. There are some great libraries for schema validation that even generate Typescript types, and using one of these for the JSON and for the weather API response would make things a whole lot more robust.
* The Leaflet library that I ended up using for the map has a whole swath of features that I didn't even look into, which could certainly provide a more interesting map experience. More information from the uploaded JSON could be displayed there, e.g. it included information on vehicles including their locations.
* There is certainly more information in general that could be parsed from the JSON, whether to be displayed on the map or outside of it in other UI.
* There are plenty more weather attributes that could be taken from the API and displayed. One I decided not to ultimately include was wind direction. It came from the API measured in degrees (out of 360), which I thought would not be ideal for the UI. A compass direction (e.g. NW) would be more helpful, and I didn't have the time to experiment with the API and determine the best way to parse that.
* Instead of passing around the parsed JSON in its original form, I would simplify it to a more intuitive object structure (e.g. instead of `data.address.address_line1` it could suffice with just `data.address`)
