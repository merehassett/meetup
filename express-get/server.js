'use strict';
// BASIC SETUP
// =============================================================================
var express    = require('express');
var app        = express();                     // initialize our app using express
var path 	   = require('path');			    // helps make file and directory paths
var request    = require('request'); 		    // makes http calls
var bodyParser = require('body-parser');	    // grab incoming POST request input


var port = process.env.PORT || 3000;            // set our port

// tell express what view engine we want to use
app.set('view engine', 'ejs');

// tell express what folder our views/styles live in
app.use(express.static('views'));

// use body parser to view our form input easily
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// define some default values to use for our app
var defaultMeetup = {
  name:'ChickTech Austin',
  location: 'Austin, TX',
  category:"Business & Career",
  image: "http://makerfaireaustin.com/wp-content/uploads/2016/03/ChickTech-Austin-Logo.jpg"
},
defaultImage = "http://s2.quickmeme.com/img/d7/d7578f862475ecaf98064b381cda998a38409dea1123e07ba0b9babd34255360.jpg";


// ROUTES FOR OUR APP
// =============================================================================

// A browser's default method is 'GET', so this
// is the route that express uses when we visit
// our initial page.
app.get('/', function(req, res){
    res.render('index', {results: defaultMeetup, search: 'ChickTech'});
});


// This route receives the posted form.
// As explained above, usage of 'body-parser' means
// that `req.body` will be filled in with the form elements
app.post('/', function(req, res){
  getMeetupData(req, res);
});


function getMeetupData(req, res) {

    // The search term that you enter needs to be encoded to be used in an URI.
    // Encode URI components helps safely encode user entered data to prevent
    // malformed urls when special charaters are used.
    var searchTerm = encodeURIComponent(req.body.q);

    ///////////////////////////////////////////////////////////////////////////
    // CHALLENGE 1:  Fill in the value for the var GET_Request below         //
    // with the  the correct Meetup URL for retrieving the                   //
    // search for Women In Tech Meetups.                                     //
    // Don't forget to include your API Key!                                 //
    var GET_Request = '__________________';                                  //
    // Feel free to use your own debugging methods here (like console.log).  //
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    // CHALLENGE 2:  Once you have figured out how to add a static URL       //
    // for your API call, add in the search term from the Input Field        //
    // You can concatenate variable and text using the plus (+) operator.    //
    var GET_Request_With_Search = '_____________________';                   //
    // Don't forget to change the 1st parameter of the request() call!       //
    ///////////////////////////////////////////////////////////////////////////

    request(GET_Request, function(err, results) {

        // Handling an invalid Meetup API call
        if (err || results.statusCode === 404) {
            var err = err || "No Meetup Results",
                meetup = { name: "No Meetups Found" };

            res.render('index', {err: err, meetup: meetup});
        } else {
            // Successful GET request results end up here!

            var parsedData = JSON.parse(results.body),
                meetup = createMeetup(parsedData);

            // Check out the meetup results in your terminal
            console.log("Meetup from createMeetup method on line 95: ", meetup)

            res.render('index', {results: meetup, search: req.body.q});

        }
    });
};


// Helper method for grabbing data from our JSON results
function createMeetup(results) {
    var meetup = {};

    //Check if there are results in from the meetup search
    if(results[0]) {
      meetup.name = results[0].name || '';
      meetup.category = results[0].category.name || '';
      meetup.location = results[0].city || '';
      meetup.image = (results[0].group_photo) ? results[0].group_photo.photo_link : defaultImage;
    } else {
      //If no results are found, we'll pass back a dummy meetup
      meetup.name = "No Results Found";
      meetup.image = defaultImage;
      meetup.category = "N/A";
      meetup.location = "N/A";
    }

    return meetup;
};


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Meetup Search is happening on port ' + port);
