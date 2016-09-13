var express = require('express');
var webapi = express.Router();
var path = require('path');
var dataset=path.join(__dirname,'../dummydata/battles.csv');
var fs=require('fs');	//all methods have sync and async forms

//This method will convert csv data into Array of JSON!
function csvParser(csvData){	
	var lineByData=csvData.split("\r");
	var mainData=[],data=[];
	var len=lineByData.length;
	if(len>0){
		var header=lineByData[0].split(',');
		if(len>1){
			for(var i=1;i<len;i++){
				var str=lineByData[i];
				data=str.split(',');
				var obj={};
				var dataLength=data.length;
				for(var j=0;j<dataLength;j++){
					if(header[j]){
						obj[header[j]]=data[j];
					}
				}
				mainData.push(obj);
			}
		}
		else{
			//something went wrong :(
		}
	}
	else{
		//something went wrong :(
	}
	console.log(mainData.length);
	return mainData;
}

function battleDetailsData(battleDetailsData,type,value){
	var data=csvParser(battleDetailsData);
	var battleDetails=[];
	var len=data.length;
	var NAME=false,LOCATION=false,TYPE=false,KING=false;
	
	if(type=="Name"){
		NAME=true;
	}
	else if(type=="Location"){
		LOCATION=true;
	}
	else if(type=="King"){
		KING=true;
	}
	else if(type=="Type"){
		TYPE=true;
	}
	
	for(var i=0;i<len;i++){
		var row=data[i];
		var obj={};
		//BAD CODE IN HURRY ONLY 1 HR LEFT
		if(NAME && value==row.name){
			obj["name"]=row.name;
			obj["year"]=row.year;
			obj["attacker_king"]=row.attacker_king;
			obj["defender_king"]=row.defender_king;
			obj["battle_type"]=row.battle_type;
			obj["attacker_outcome"]=row.attacker_outcome;
			obj["location"]=row.location;
			battleDetails.push(obj);
		}
		else if(LOCATION && value==row.location){
			obj["name"]=row.name;
			obj["year"]=row.year;
			obj["attacker_king"]=row.attacker_king;
			obj["defender_king"]=row.defender_king;
			obj["battle_type"]=row.battle_type;
			obj["attacker_outcome"]=row.attacker_outcome;
			obj["location"]=row.location;
			battleDetails.push(obj);
		}
		else if(KING && value==row.attacker_king){
			obj["name"]=row.name;
			obj["year"]=row.year;
			obj["attacker_king"]=row.attacker_king;
			obj["defender_king"]=row.defender_king;
			obj["battle_type"]=row.battle_type;
			obj["attacker_outcome"]=row.attacker_outcome;
			obj["location"]=row.location;
			battleDetails.push(obj);
		}
		else if(TYPE && value==row.battle_type){
			obj["name"]=row.name;
			obj["year"]=row.year;
			obj["attacker_king"]=row.attacker_king;
			obj["defender_king"]=row.defender_king;
			obj["battle_type"]=row.battle_type;
			obj["attacker_outcome"]=row.attacker_outcome;
			obj["location"]=row.location;
			battleDetails.push(obj);
		}
	}
	return battleDetails;
}
var requestHandler={
		getAllBattleDetails:function(req,res,next){
			try{
				fs.readFile(dataset,"utf8",function(error,result){
					if(error){
						// something goes wrong file reading file!
					}
					else{
						if(result){
							var data=csvParser(result)
							res.json({"allBattlesInfo":data});
						}
						else{
							//something went wrong with returned data
						}
					}
				});		
			}catch(error){
				res.json({"data":null});
			}
		},
		getBattleDetails:function(req,res,next){
			try{
				fs.readFile(dataset,"utf8",function(error,result){
					if(error){
						// something goes wrong file reading file!
					}
					else{
						if(result){
							var data=csvParser(result)
							var battleDetails=[];
							var len=data.length;
							for(var i=0;i<len;i++){
								var row=data[i];
								var obj={};
								obj["name"]=row.name;
								obj["year"]=row.year;
								obj["attacker_king"]=row.attacker_king;
								obj["defender_king"]=row.defender_king;
								obj["battle_type"]=row.battle_type;
								obj["attacker_outcome"]=row.attacker_outcome;
								obj["location"]=row.location;
								battleDetails.push(obj);
							}
							res.json({"battleDetails":battleDetails});
						}
						else{
							res.json({"battleDetails":null});
							//something went wrong with returned data
						}
					}
				});
			}catch(error){
				res.json({"battleDetails":null});
			}
		},
		getCountOfTotalBattles:function(req,res,next){
			try{
				fs.readFile(dataset,"utf8",function(error,result){
					if(error){
						res.json({"getCountOfTotalBattles":null});
					}
					else{
						var data=csvParser(result)
						var battleDetails=[];
						var len=data.length;
						res.json({"getCountOfTotalBattles":len});
					}
				});
			}catch(error){
				res.json({"getCountOfTotalBattles":null});
			}
		},
		getBattleDetailsByParams:function(req,res,next){
			try{
				fs.readFile(dataset,"utf8",function(error,data){
					var battleDetailsByParams=null;
					if(error){
						
					}
					else{
						if(req.query.Name){
							battleDetailsByParams=battleDetailsData(data,"Name",req.query.Name);
						}
						else if(req.query.Type){
							battleDetailsByParams=battleDetailsData(data,"Type",req.query.Type);
						}
						else if(req.query.Location){
							battleDetailsByParams=battleDetailsData(data,"Location",req.query.Location);
						}
						else if(req.query.King){
							battleDetailsByParams=battleDetailsData(data,"King",req.query.King);
						}
						res.json({"battleDetailsByParams":battleDetailsByParams});
					}
				});
			}catch(error){
				res.json({"battleDetailsByParams":null});
			}	
		},
		getCrazyStats:function(req,res,next){
			
		}
};

//Everything can be retrived just by using getAllBattleDetails
webapi.get('/getAllBattleDetails',requestHandler.getAllBattleDetails);
webapi.get('/getBattleDetails',requestHandler.getBattleDetails);
webapi.get('/getBattleDetailsByParams',requestHandler.getBattleDetailsByParams);
webapi.get('/getCountOfTotalBattles',requestHandler.getCountOfTotalBattles);
webapi.get('/getCrazyStats',requestHandler.getCrazyStats);

//response
//places data (list) 
//count (total number of data records) total number of battles available
//stats (sample JSON response format is available)
//search by name, king, type or location feature bring battle details

module.exports = webapi;