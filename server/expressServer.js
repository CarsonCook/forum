"use strict";

var express = require('express');
var path = require('path');
var cp = require('cookie-parser');
var bp = require('body-parser');
var log = require('./util/log');
var validator = require('./util/Validator');
var compare = require('./util/Compare');
var Environment = require('./util/evalEnvironment').Environment;
var requestor = require('./util/requestResponder');
var fs = require('fs');
var literals = require('./util/StringLiterals.js');

const PORT = 8080;
var server = express();

// directories from which we serve css, js and assets statically
server.use('/css', express.static('../client/css'));
server.use('/js', express.static('../client/js'));
server.use('/assets', express.static('../client/assets'));

// imports all the required middleware to express
server.use(cp(literals.SIMPLE_SECRET)); //simple secret is an example password
server.use(bp.json());

//configuration information
var config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config/config.json'), literals.UTF8));

var isInProduction = (config.PRODUCTION == literals.TRUE);

/* GET Requests
**
** These correspond to the urls you type into the browser and define the actions to be 
** taken when something like http://localhost:8080/***** is typed in
** For instance typing http://localhost:8080 in will correspond to the server.get('/', ...)
** call, http://localhost:8080/search corresponds to the server.get('/search', ...) call etc
*/

server.get(literals.LANDING_PAGE, function(request, response) { // default link, delivers landing page
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LOGIN_PAGE);
		return;
	}

	response.sendFile(path.join(__dirname, '..', 'client/html/index.html'));
});

server.get(literals.SEARCH_PAGE, function(request, response) { // to search bar
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LOGIN_PAGE);
		return;
	}

	response.sendFile(path.join(__dirname, '..', 'client/html/index.html'));
});

server.get('/question/id=\*', function(request, response) { // question page, queried by id
	// validateSession(); // this needs to be at the beginning of every request
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LOGIN_PAGE);
		return;
	}

	var pertinentQuery = request.url.replace('/question/id=', '');
	response.sendFile(path.join(__dirname, '..', 'client/html/postAndComment.html'));
});

server.get(literals.ABOUT_PAGE, function(request, response) { //about page
	if (Object.keys(request.signedCookies).length === 0) {
		response.redirect(literals.LOGIN_PAGE);
		return;
	}

	response.sendFile(path.join(__dirname, '..', 'client/html/about.html'));
});

server.get(literals.NEW_PAGE, function(request, response) { // newest questions being asked in list view
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LOGIN_PAGE);
		return;
	}
	response.sendFile(path.join(__dirname, '..', 'client/html/new.html'));
});

server.get(literals.LIST_PAGE, function(request, response) { //return the a default most recent list of questions
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LOGIN_PAGE);
		return;
	}

	response.sendFile(path.join(__dirname, '..', 'client/html/questionList.html'));
});

server.get('/list/filter?\*', function(request, response) { //return the list filtered by the passed parameters, active search must route here ordered by most positive votes
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LOGIN_PAGE);
		return;
	}

	response.sendFile(path.join(__dirname, '..', 'client/html/questionList.html'));
});

server.get(literals.PROFILE_PAGE, function(request, response) { //user home page
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LOGIN_PAGE);
		return;
	}
	if (!compare.isEmpty(request.query)) {
		validator.validateUser(request).then(function(res) {
			response.sendFile(path.join(__dirname, '..', 'client/html/profile.html'));

		}, function(err) {
			response.sendFile(path.join(__dirname, '..', 'client/html/notFound.html'));

		});
	}
	else{
		response.sendFile(path.join(__dirname, '..', 'client/html/profile.html'));
	}
});

server.get(literals.LOGIN_PAGE, function(request, response) { // mock login page
	if (compare.isEmpty(request.signedCookies)) {
		response.sendFile(path.join(__dirname, '..', 'client/html/login.html'));
		return;
	}
	else {
		response.redirect(literals.LANDING_PAGE);
	}
});

server.get(literals.GUIDELINES_PAGE, function(request, response) { // mock login page
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LANDING_PAGE);
		return;
	}
	else {
		response.sendFile(path.join(__dirname, '..', 'client/html/guidelines.html'));
	}
});

server.get(literals.DEV_PAGE, function(request, response) { // mock login page
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LANDING_PAGE);
		return;
	}
	else {
		validator.hasRole(request.signedCookies.usercookie.userID, literals.ADMIN).then(function(res) {
			response.sendFile(path.join(__dirname, '..', 'client/html/dev.html'));
		}, function(res) {
			response.sendFile(path.join(__dirname, '..', 'client/html/notFound.html'));
		});
		
	}
});

server.get(literals.EVAL_PAGE, function(request, response) { //allows evaluation of server side code from the client
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LANDING_PAGE);
		return;
	}
	else {
		validator.hasRole(request.signedCookies.usercookie.userID, literals.ADMIN).then(function(res) {
			response.sendFile(path.join(__dirname, '..', 'client/html/eval.html'));
		}, function(res) {
			response.sendFile(path.join(__dirname, '..', 'client/html/notFound.html'));
		});
	}
});

server.get(literals.HELP_PAGE, function(request, response) { // user help page
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LANDING_PAGE);
		return;
	}
	
	response.sendFile(path.join(__dirname, '..', 'client/html/help.html'));
});

server.get(literals.CLASS_PAGE, function(request, response) { // user help page
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LANDING_PAGE);
		return;
	}
	
	response.sendFile(path.join(__dirname, '..', 'client/html/class.html'));
});

/* POST Requests
**
** These are not directly accessible from the browser, but can be used by making a POST
** request to the corresponding link.
*/

server.post(literals.LOGIN_PAGE, function(request, response) {
	if (!request.body) {
		response.send(false);
		return;
	}

	validator.loginAndCreateSession(request.body).then(function(result) {
		response.cookie(literals.USER_COOKIE, result, {signed: true});
    	response.send(true); // REDIRECT MUST OCCUR ON THE CLIENT AFTER A COOKIE IS SUCCESSFULLY SET

	}, function(result) {
		response.send(false);
	});
});

server.post(literals.EVAL_PAGE, function(request, response) {
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LANDING_PAGE);
		return;
	}
	else {
		validator.hasRole(request.signedCookies.usercookie.userID, literals.ADMIN).then(function(res) {
			var env = new Environment(); // a new disposable execution environment
			env.execute(request.body.code).then(function(res) {
				response.send(res);

			}, function(err) {
				response.send(err);
			});
		}, function(res) {
			response.send("You are not authorized for this role");
		});
	}
});

server.post(literals.LOGOUT_PAGE, function(request, response) { // a place to post exclusively for logout requests
	if (compare.isEmpty(request.signedCookies)) {
		response.redirect(literals.LOGIN_PAGE); //then there's nothing to sign out of
		return;
	}

	if (request.body.logout === true) {
		validator.logout(request.signedCookies.usercookie).then(function(res) {
			response.clearCookie(literals.USER_COOKIE);
			response.send(true);
		}, function(res) {
			response.send(false);
		});
	}
});

server.post(literals.VOTE_PAGE, function(request, response) {
	if (compare.isEmpty(request.signedCookies)){ // if not signed in, you can't vote
		response.send(literals.NEED_LOGIN); //tell the client to tell the user they need to login
		return;
	}
	//check if user has already voted here and the vote is the same as their previous vote
	//reject if they have, allow if they haven't, regardless, increment count on the client
});

server.post(literals.SUBSCRIBE_PAGE, function(request, response) {
	if (compare.isEmpty(request.signedCookies)) { //if you're not signed in you can't subscribe
		response.send(literals.NEED_LOGIN); // tell them to log in
		return;
	}

	// check if user is already subscribed
	// subscribe them if they aren't
	// you'll have request.body = { 'userId': 'useridentifyingid', 'itemId': 'itemidentifyingid' } to get information out of

});

server.post(literals.INFO_PAGE, function(request, response) {
	if (compare.isEmpty(request.signedCookies)) { //if you're not signed in you can't get information
		response.send(literals.NEED_LOGIN); // tell them to log in
		return;
	}
	requestor.parseRequest(request).then(function(resultToReturn) {
		response.send(resultToReturn);

	}, function(err) {
		response.send({res: "not found"});

	}).catch(function(err) {
		response.send(err);
		
	})

});

/* Use Links
**
** These are general purpose links used to catch server errors and requests that ask for
** links that do not exist
*/

server.use(function (err, req, res, next) { // catches URL errors
	log.error(err.stack);
	res.status(500).sendFile(path.join(__dirname, '..', 'client/html/notFound.html'));
});

server.use(function (req, res, next) { // returns 404s instead of cannot GET
	res.status(404).sendFile(path.join(__dirname, '..', 'client/html/notFound.html'));
});


// start the server
server.listen(PORT);
log.info("Listening on port " + PORT.toString());
