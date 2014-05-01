var app = angular.module('contacts', ['ui.bootstrap']);

app.directive('ngxTest', [function (){
	console.log('Directive')
	return {
      link: function(scope, elem, attr, ngModel) {
      	scope.$watch('type + value', function(){
      		var disabled = scope.type=='Choose type' || (scope.value && scope.value.length == 0);
      		console.log(disabled);
      		console.log($(elem));
      		$(elem).attr('disabled', disabled);
      	}, true);
      }
   };
}]);

app.factory('ContactsList', ['$rootScope', function ($rootScope) {
	
	var list;

	if(localStorage['list'] == undefined){
		list = [];
		flush();
	}

	list = JSON.parse(localStorage['list']);
	console.log('Create factory', list);
	function flush(){
		localStorage['list'] = JSON.stringify(list);
	}

	function indexOf(id){
		var iof = -1;
		for(var i = 0; i < list.length; i++){
			if(list[i].id == id){
				return i;
				break;
			}
		}
		return iof;
	}
	
	var s = {
		get:function(){
			return list;
		},
		add:function(type, value){
			list.push({id:Math.floor(Math.random() * 1e6), type:type, value:value});
			flush();
			return s;
		},
		remove:function(id){
			var iof = indexOf(id);
			if(iof == -1)return s;

			list.splice(iof, 1);
			flush();
			return s;
		},
		order:function(id, newIndex){
			var iof = indexOf(id);
			if(iof == -1)return s;

			var item = list[iof];
			list.splice(iof, 1);
			list.splice(newIndex, 0, item);
			flush();
			return s;
		},
		indexOf:indexOf
	}

	return s;
}]);


app.controller('ContactsController', ['ContactsList', '$scope', function(ContactsList, $scope){
	$scope.contacts = ContactsList.get();
	$scope.remove = function(id){
		ContactsList.remove(id);
	}

	$scope.orderUp= function(id){
		var iof = ContactsList.indexOf(id);
		if(iof == 0)return;
		ContactsList.order(id, iof - 1);
	}

	$scope.orderDown= function(id){
		var iof = ContactsList.indexOf(id);
		if(iof == ContactsList.get().length-1)return;
		ContactsList.order(id, iof + 1);
	}
}]);

app.controller('ContactsInputController', ['ContactsList', '$scope', function(ContactsList, $scope){
	$scope.type = 'Choose type';
	$scope.items = [
		'Skype',
		'E-mail',
		'Web site',
		'ICQ',
		'Jabber',
		'Phone'
	];

	$scope.add = function(type, value) {
		console.log(type, value);
		ContactsList.add(type, value);
		$scope.value = '';
		$scope.type = 'Choose type';
	}
	
	$scope.select = function(select){
		$scope.type = select;
	}
}]);
