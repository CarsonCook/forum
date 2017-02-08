/*
** ServerSweeper
** Created by Michael Albinson 1/12/17
*/

"use strict";

/*
** ServerSweeper
**
** The sweeper object performs common operations on the databse to ensure that
** all
*/

var DBRow = require('../DBRow.js').DBRow;
var events = require('events');
var log = require('../log.js');
var lit = require('../Literals.js');

exports.Sweeper = function() {

	var eventListener = new events.EventEmitter;
	var cancelled = false;

	eventListener.on(lit.SWEEPER_CANCEL_JOB, function(jobs) {
		if (!jobs.includes(lit.SWEEP))
			return;

		cancelled = true;
	})

	this.sweepTable = function(table) {
		switch(table) {
			case (lit.USER_TABLE):
				userCleanup();
				break;
			case (lit.LINK):
				linkCleanup();
				break;
			case (lit.POST_TABLE):
				postCleanup();
				break;
			case (lit.COMMENT_TABLE):
				commentCleanup();
				break;
			case (lit.REPORT_TABLE):
				reportCleanup();
				break;
			case (lit.TAG_TABLE):
				tagCleanup();
				break;
			case (lit.CLASS_TABLE):
				classCleanup();
				break;
			case (lit.SESSION_TABLE):
				sessionCleanup();
				break;
			default:
				log.warn('There is no cleanup routine defined for the table: "' + table + '" continuing happily.');

		}
	}

	this.sweepAllTables = function() {
		log.info("Starting full slate of database validations, server performance may be reduced for some time");
		classCleanup();
		commentCleanup();
		linkCleanup();
		postCleanup();
		reportCleanup();
		sessionCleanup();
		tagCleanup();
		userCleanup();
	}

	this.isCancelled = function() {
		return cancelled;
	}

	/*
	** Checks the user table to ensure that all users have the proper number of votes
	** and that no invalid users are permitted to do things they should not do
	*/
	function userCleanup() {

	}

	/*
	** Checks the link table to make sure links are still valid (lead to non-empty pages/404 errors)
	*/
	function linkCleanup() {
		var links = new DBRow(lit.LINK);
		links.query().then(function() {
			var href = "";

			while(links.next()){
				href = links.getValue(lit.LINK);
				var isValid = true;//test link using something
				if (isValid)
					continue;
				else
					links.delete().then(function() { //if it's not valid delete the current link

					}, function(err) {
						log.warn("The link " + href + " was unable to be deleted but is invalid, consider manually deleting the link.")
					})
			}

		}, function(err) {

		});
	}


}