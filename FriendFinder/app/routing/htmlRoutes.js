/*Your `htmlRoutes.js` file should include two routes:

   * A GET Route to `/survey` which should display the survey page.
   * A default, catch-all route that leads to `home.html` which displays the home page. 
*/
// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require('path');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

    // HTML GET Requests
    // Below code handles when users "visit" a page. 
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------

    // Home page
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, '../public/home.html'));
	});

	// Survey page
	app.get('/survey', function(req, res) {
		res.sendFile(path.join(__dirname, '../public/survey.html'));
	});



    /* app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname + "../public/survey.html"));
    });

    // If no matching route is found default to home
    app.use(function (req, res) {
        res.sendFile(path.join(__dirname + "../public/home.html"));
    }); */

}