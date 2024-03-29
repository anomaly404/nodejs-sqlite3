/**
 * Author: Manan Dang
   This file is taking request from server.js and replies the data fetched from the database
 */


var sqlite3 = require('sqlite3').verbose();

exports.findById = function(req, res) 
{	
	function readById() 
	{
		var data=new Array();	
		var i;
		var j;
		j=0;
		i=0;
		var tosend='<html>';

		//connecting to database

		db = new sqlite3.Database('sqlite_file.db');	
		console.log("Reading Data");

		//Reading all data from the database which has table name "plugins"

		var a=db.all("SELECT rowid as id,* FROM plugins", function(err,rows) 
		{		
			rows.forEach(function(row)	
			{		
				
				if(req.params.id==row.id)
				{
					data = new Object();

					//By default in JSON format
					data[i]=row;

					//Coneverting the data to HTML format
					tosend+='<br><br><h2>'+row.title+'</h2>';
					tosend+=row.desc+'<br>';
					tosend+='DATE : '+row.date+'<br>';
					tosend+='Categories : '+row.categories+'<br>';
					tosend+='Author : '+row.author+'<br>Related Links';
					tosend+='<a href=\"'+row.link+'\">'+row.link+'</a><br>';
					tosend+='<a href=\"'+row.enclosure_text+'\">'+row.enclosure_text+'</a><br>';
					tosend+=row.enclosure_bytes+'<br>';
					i++;
				}
		    	});
		tosend+='</html>';
		res.send(data);  //use "tosend" instead of "data" to send the data in HTML

		//Error can be seen at console
		console.log(err);
		
		//Closing the database
		db.close();
		});
	}

	//Function to read all the data called here
	readById();	
}
exports.findAll = function(req, res) 
{
	
	function readAll() 
	{
		var data=new Array();		
		var i;
		i=0;
		var tosend ='<html>';

		//connecting to database		
		
		db = new sqlite3.Database('sqlite_file.db');	
		console.log("Reading Data");

		//Reading all data from the database which has table name "plugins"
		var a=db.all("SELECT rowid as id, * FROM plugins", function(err,rows) 
		{		
			rows.forEach(function(row)	
			{
				//By default in JSON format;
				data=new Object(rows);
				
				//Coneverting the data to HTML format
				tosend+='<br><br><h2>'+row.title+'</h2>';
				tosend+=row.desc+'<br>';
				tosend+='DATE : '+row.date+'<br>';
				tosend+='Categories : '+row.categories+'<br>';
				tosend+='Author : '+row.author+'<br>Related Links';
				tosend+='<a href=\"'+row.link+'\">'+row.link+'</a><br>';
				tosend+='<a href=\"'+row.enclosure_text+'\">'+row.enclosure_text+'</a><br>';
				tosend+=row.enclosure_bytes+'<br>';
				i++;
		    	});
	
		tosend+='</html>';
		res.send(data);  //use "tosend" instead of "data" to send the data in HTML

		//Error can be seen at console
		console.log(err);
		
		//Closing the database
		db.close();
		});
	}
	readAll();	
}

