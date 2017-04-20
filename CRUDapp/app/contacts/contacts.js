'use strict';

// Declare app level module which depends on views, and components
angular.module('myContacts.contacts', [
  'ngRoute',
  'firebase',
  'myContacts.contacts'

]).
config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/contacts', {
		templateUrl: 'contacts/contacts.html',
		controller: 'contactsController'
	})
 

  $routeProvider.otherwise({redirectTo: '/contacts'});
}])


.controller('contactsController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	//var ref= new Firebase('https://contactsapp-b84ae.firebaseio.com/contacts');

  var rootRef= firebase.database().ref(); //step one



	$scope.contacts = $firebaseArray(rootRef); //get data from firebase
 
	//function to toggle the form
	$scope.addForm = function(){
		$scope.showAddForm=true;
	}


	//function to toggle the form
	$scope.showEditForm = function(contacts){
		$scope.editFormShow=true;

		$scope.id=contacts.$id;
		$scope.name=contacts.name;
		$scope.email = contacts.email;
		$scope.company = contacts.company;
		$scope.city = contacts.city;
		$scope.phone = contacts.phone;
		$scope.catdog =contacts.catdog;
	}

	//function to toggle the form
	$scope.hideForm = function(){
		$scope.showAddForm=false;
		$scope.visitorDetails=false;
	}

	//function to submit new entry details
	$scope.addFormSubmit = function(){

		if ($scope.name){ var name = $scope.name; } else { var name =null; }
		if ($scope.email){ var email = $scope.email; } else { var email =null; }
		if ($scope.company){ var company = $scope.company; } else { var company =null; }	
		if ($scope.city){ var city = $scope.city; } else { var city =null; }
		if ($scope.phone){ var phone = $scope.phone; } else { var phone =null; }
		if ($scope.catdog){ var catdog = $scope.catdog; } else { var catdog =null; }
		
		$scope.contacts.$add({   //step two
			name: name,
			email: email,
			company: company,
			city: city,
			phone: phone,
			catdog: catdog
		}).then(function(rootRef){
				// var id = rootRef.key();
				// console.log('Addedcontact: '+id);

				clear();

				$scope.showAddForm=false;

				$scope.msg='Entry Submitted!';
		})
	}


	$scope.editFormSubmit = function(){

			var id = $scope.id;

			var record = $scope.contacts.$getRecord(id);

			record.name = $scope.name;
			record.email = $scope.email;
			record.company = $scope.company;
			record.city = $scope.city;
			record.phone = $scope.phone;
			record.catdog = $scope.catdog;


	$scope.contacts.$save(record).then(function(rootRef){

		});

			clear();
			$scope.editFormShow = false;
			$scope.msg='Entry Updated!';
			// var id = rootRef.key();
			// console.log('Addedcontact: '+id);
	}



	$scope.showEntry= function(contacts){
		//console.log('Details works fine');
		$scope.name=contacts.name;
		$scope.email = contacts.email;
		$scope.company = contacts.company;
		$scope.city = contacts.city;
		$scope.phone = contacts.phone;
		$scope.catdog =contacts.catdog;

		$scope.visitorDetails=true;
	}


	$scope.removeContact= function(contacts){

		$scope.contacts.$remove(contacts);
		$scope.msg='Entry Deleted!';

	}

	function clear(){
		$scope.name = '';
		$scope.email = '';
		$scope.company = '';
		$scope.city = '';
		$scope.phone = '';
		$scope.catdog ='';

	}

}]);