/**
 * Author: Manan Dang
   This file is the main server file to be run which sends the request
 */


var express = require('express'),
    wines = require('./routes/plugins');
 
var app = express();
app.get('/plugins', wines.findAll);
app.get('/plugins/:id', wines.findById);
 
//Node will be run on defined port number
app.listen(3050);


console.log('Listening on port 3050...');
