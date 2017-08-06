
# Integrating the World of APIs with NodeJS


## What you will learn from this sample
- Implement a GET request inside of a Node/Express app


## Instructions
1. Install dependencies & run the server from within the project's root directory. This looks in your package.json file to find which APIs to add  
	```
	npm install
	```
2. Call an API from Node/Express!
	- In the server.js file (line 62), add the correct GET request so that it successfully retrieves data from the Meetup API search endpoint for Women in Tech
	- Start your node server
		- `node server.js`
	- Once sucessfully implemented, the Meetup Logo, name, city, and category will be displayed on the page!  
3. Allow for Meetup Searches!
	- Back in the server.js file, add the API URI (line 71) for a request that considers the user's search term
	- Don't forget to update the request() parameter name from GET_Request to GET_Request_With_Search
