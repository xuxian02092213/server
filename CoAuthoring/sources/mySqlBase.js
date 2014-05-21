﻿var config = require('./config.json');var configMySql = config["mysql"];var mysql = require('mysql');var tableChangesName = configMySql["tableChangesName"];var tableUsersName = configMySql["tableUsersName"];var pool  = mysql.createPool({	host		: configMySql["host"],	user		: configMySql["user"],	password	: configMySql["pass"],	database	: configMySql["database"],	charset		: configMySql["charset"]});exports.insertChanges = function (docId, userid, saveData, serverHost, serverPort, serverPath, documentFormatSave) {	pool.getConnection(function(err, connection) {		var sqlCommand = "INSERT INTO " + tableChangesName +			" (docid, userid, data, serverHost, serverPort, serverPath, documentFormatSave) VALUES ('" + docId +			"','" + userid + "','" + saveData + "','" + serverHost + "','" + serverPort + "','" + serverPath +			"','" + documentFormatSave + "');";		connection.query(sqlCommand, function () {			connection.release();		});	});};exports.loadChanges = function (callbackFunction) {	pool.getConnection(function(err, connection) {		var sqlCommand = "SELECT * FROM " + tableChangesName + ";";		connection.query(sqlCommand, function (err, result) {			connection.release();			callbackFunction(result);		});	});};exports.insertUser = function (docId, userId, userIdUnique) {	pool.getConnection(function(err, connection) {		var sqlCommand = "INSERT INTO " + tableUsersName +			" (docid, userid, useridunique) VALUES ('" + docId + "','" + userId + "','" + userIdUnique + "');";		connection.query(sqlCommand, function () {			connection.release();		});	});};exports.deleteUser = function (docId, userIdUnique) {	pool.getConnection(function(err, connection) {		var sqlCommand = "DELETE FROM " + tableUsersName + " WHERE docid='" + docId +			"' AND useridunique='" + userIdUnique + "';";		connection.query(sqlCommand, function () {			connection.release();		});	});};exports.clearAllUsers = function (callbackFunction) {	pool.getConnection(function(err, connection) {		var sqlCommand = "DELETE FROM " + tableUsersName + ";";		connection.query(sqlCommand, function () {			connection.release();			callbackFunction();		});	});};