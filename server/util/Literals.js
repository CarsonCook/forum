/**
 * Created by Carson on 02/02/2017.
 * String literals to be used for other files.
 * Constant object is exported.
 */

"use strict";

const literals = {

    //miscellaneous database table information
    TABLE_NAME: "tablename",
    FIELDS: "fields",
    TABLE: "table",
    TYPE: "type",
    DEFAULT: "default",
    PRIMARY_KEY: "primaryKey",

    //miscellaneous user information
    PROFILE: "profile",
    QUEENS_EMAIL: "@queensu.ca",

    //variable information, such as types, operations tec.
    OPERATOR: "operator",
    VALUE: "value",
    UNDEFINED: "undefined",
    SYMBOL: "symbol",
    OBJECT: "object",
    FUNCTION: "function",
    NUMBER: "number",
    BOOLEAN: "boolean",
    STRING: "string",

    //web pages routes, with '/'
    LOGIN_ROUTE: "/login",
    ABOUT_ROUTE: "/about",
    NEW_ROUTE: "/new",
    LIST_ROUTE: "/list",
    PROFILE_ROUTE: "/profile",
    GUIDELINES_ROUTE: "/guidelines",
    DEV_ROUTE: "/dev",
    EVAL_ROUTE: "/eval",
    HELP_ROUTE: "/help",
    CLASS_ROUTE: "/class",
    SEARCH_ROUTE: "/search",
    LOGOUT_ROUTE: "/logout",
    VOTE_ROUTE: "/vote",
    SUBSCRIBE_ROUTE: "/subscribe",
    INFO_ROUTE: "/info",
    ROOT_ROUTE: "/",

    //values in string format: e.g. boolean value true as \'true\'
    ZERO: "0",
    ONE: "1",
    TRUE: "true",
    FALSE: "false",

    //NOTE: These literals do not follow the same
    //format because there are uppercase and lowercase instances
    //sql sort commands
    DESC: "DESC",
    desc: "desc",
    ASC: "ASC",
    asc: "asc",

    //words for string manipulations, sql strings
    IN: "in",
    BETWEEN: "between",
    LIKE: "like",
    TO: "to",

    //database configurations
    HOST: "host",
    USER: "user",
    SECRET: "secret",
    SIMPLE_SECRET: "simplesecret",
    DATABASE: "database",
    MAX_CONNECTIONS: "maxConnections",
    PRODUCTION: "production",
    DATABASE_SETUP_NEEDED: "databaseSetupNeeded",
    LOAD_MOCK_DATA: "loadMockData",
    UTF8: "utf8",

    //session information
    ADMIN: "admin",
    USER_COOKIE: "usercookie",
    NEED_LOGIN: "needLogin",

    //fields common to more than one table
    FIELD_UPVOTES: "upvotes",
    FIELD_DOWNVOTES: "downvotes",
    FIELD_NETVOTES: "netVotes",
    FIELD_AUTHOR: "author",
    FIELD_ID: "id",
    FIELD_CONTENT: "content",
    FIELD_TIMESTAMP: "timestamp",
    FIELD_USER_ID: "userID",
    FIELD_TITLE: "title",
    FIELD_TAGS: "tags",
    FIELD_SUMMARY: "summary",
    FIELD_ITEM_ID: "itemID",
    FIELD_TYPE: "type",

    //fields for post table only
    POST_TABLE: "post",
    FIELD_ANSWERED: "answered",

    //fields for comment table only
    COMMENT_TABLE: "comment",
    FIELD_IS_SOLUTION: "isSolution",
    FIELD_COMMENT_LEVEL: "commentLevel",
    FIELD_PARENT_POST: "parentPost",
    FIELD_PARENT_COMMENT: "parentComment",

    //fields for user table only
    USER_TABLE: "user",
    FIELD_NETID: "netid",
    FIELD_USERNAME: "username",
    FIELD_TOTAL_UPVOTES: "totalUpvotes",
    FIELD_TOTAL_DOWNVOTES: "totalDownvotes",
    FIELD_TOTAL_SOLVED: "totalSolved",
    FIELD_REPORT_COUNT: "reportCount",
    FIELD_DATE_JOINED: "dateJoined",
    FIELD_ACCEPTED_TERMS: "acceptedTerms",
    FIELD_PRIVILEGE: "privilege",

    //fields for report table only
    REPORT_TABLE: "report",
    FIELD_REPORT_REASON: "reportReason",
    FIELD_REPORT: "report",
    FIELD_REPORTING_USER: "reportingUser",
    FIELD_REPORTED_USER: "reportedUser",
    FIELD_RELATED_COMMENT_OR_POST_ID: "relatedCommentOrPostID",

    //fields for tag table only
    TAG_TABLE: "tag",
    FIELD_NAME: "name",
    FIELD_RELATED_TAGS: "relatedTags",

    //fields for vote table only
    VOTE_TABLE: "vote",
    FIELD_COMMENT_OR_POST_ID: "commentOrPostID",
    FIELD_VOTE_VALUE: "voteValue",

    //fields for session table only
    SESSION_TABLE: "session",
    FIELD_SESSION_START: "sessionStart",

    //fields for class table only
    CLASS_TABLE: "class",
    FIELD_COURSE_CODE: "courseCode",
    FIELD_LONG_SUMMARY: "longSummary",

    //fields for link table only
    LINK: "link",
    FIELD_TRUSTED: "trusted",
    FIELD_DATE_ADDED: "dateAdded",
    FIELD_ADDED_BY: "addedBy",

    //fields for subscriptions table only
    SUBSCRIPTIONS_TABLE: "subscriptions",
    FIELD_LAST_NOTIFIED: "lastNotified",
    FIELD_NUM_NOTIFICATIONS_MISSED: "numNotificationsMissed",
    FIELD_NUM_TIME_NOTIFIED: "numTimesNotified",
    FIELD_DATE_SUBSCRIBED: "dateSubscribed",

    //fields for saved table only
    SAVED_TABLE: "saved",
    FIELD_DATE_SAVED: "dateSaved",

    //fields for contributions table only
    CONTRIBUTION_TABLE: "contribution",
    FIELD_DATE: "date",

    //fields for sweeper class
    SWEEPER_CANCEL_JOB: "cancelJob",
    SWEEP: "sweep",

    //integer values
    MIN_NUM_MISSED_NOTIFICATIONS: 0, //at least one missed notification needed
    MIN_MS_TO_NOTIFY_AGAIN: 86400000 //one day in milliseconds
};

module.exports = literals;