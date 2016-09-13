//Insert code below
console.log("inside js!");
var app=angular.module("got",['ngAnimate','ui.bootstrap']);

var constant={
		getBattleDetails:"/got/webapi/getBattleDetails",
		getBattleDetailsByParams:"/got/webapi/getBattleDetailsByParams",
		getCountOfTotalBattles:"/got/webapi/getCountOfTotalBattles",
		getCrazyStats:"/got/webapi/getCountOfTotalBattles"
};

//Utility function to handle all kind of alert messages using jquery
function alertHandler(alertType,message){
	$("#showAlertMessages").empty();
	var alertBox="";
	alertBox=$("<div class='resize-alertBox "+alertType+"'>"+
			   "<a href='#' class='close' data-dismiss='alert' aria-label='close'>x</a>"+
			   ""+message+""+
			   "</div>");
	$("#showAlertMessages").append(alertBox);
		setTimeout(function(){
			$("#showAlertMessages").fadeOut(2000,function(){
				$("#showAlertMessages").empty();
				alertBox="";
			});
		},2000);
}

//Bootstrap Alert classes to create alert messages dynamically
var alertType={
	success:"alert alert-success fade in",
	info:"alert alert-info fade in",
	warning:"alert alert-warning fade in",
	danger:"alert alert-danger fade in"
};

function gotDataController($scope,$http){
	
	var Name=[],King=[],Type=[],Location=[];
	
	$scope.selectedType="Name";
	$scope.changeSelectedType=function(selectedType){
		$scope.selectedType=selectedType;
	};
	
	$scope.searchSpecific=function(){
		if($scope.search){
			$scope.message="";
			
			var obj={};
			
			if($scope.selectedType=="Name"){
				obj.Name=$scope.search;
			}
			else if($scope.selectedType=="Location"){
				obj.Location=$scope.search;
			}
			else if($scope.selectedType=="Type"){
				obj.Type=$scope.search;
			}
			else{
				obj.King=$scope.search;
			}
			
			$http({
				method:"GET",
				url:constant.getBattleDetailsByParams,
				params:obj
			}).then(function success(response){
				$scope.search="";
				manageData(response.data.battleDetailsByParams);
			},function error(response){
				//handle error
			});
		}
		else{
			$scope.message="enter value in searchbox!";
		}
	};
	
	
	$scope.search="";
	
	$scope.message="";
	
	console.log("inside controller!");
	
	function getBattleDetails(){
		$http({
			method:"GET",
			url:constant.getBattleDetails
		}).then(function success(response){
			if(response.data.battleDetails){
				var data=response.data.battleDetails;
				manageData(data);
			}
			else{
				//show alert messages
			}
		},function error(response){
			console.log(response.data);
		});
	}
	
	$scope.getCountOfTotalBattles=function(){
		$http({
			method:"GET",
			url:constant.getCountOfTotalBattles,
		}).then(function success(response){
			$scope.search="";
			var value=response.data.getCountOfTotalBattles;
			alert("total battles fought:"+value);
		},function error(response){
			//handle error
		});
	};
	
	getBattleDetails();
	$scope.getAllBattleDetails=function(){
		getBattleDetails();
	};
	function manageData(arrayData){
		$scope.gotData=arrayData;
		$scope.totalItems=arrayData.length;
		$scope.currentPage=1;	
		$scope.itemsPerPage=6;
		$scope.maxSize=$scope.totalItems/6;
		var len=$scope.gotData.length;
		if(len>0){
			var data=$scope.gotData;
			for(var i=0;i<len;i++){
				var val=data[i];
				Name.push(val.name);
				King.push(val.attacker_king);
				Type.push(val.battle_type);
				Location.push(val.location);
			}
			$scope.Name=Name;
			$scope.King=King;
			$scope.Type=Type;
			$scope.Location=Location;
		}
		//show alert messages
	}

}



app.controller("gotDataController",gotDataController);
