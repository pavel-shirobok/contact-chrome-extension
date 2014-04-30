var app = angular.module('contacts', []);

app.factory('ContactsList', ['$rootScope', function ($rootScope) {
	
	var list;

	if(localStorage['list'] == undefined){
		list = [
				{id:'121',type:"site", value:"http://ramshteks.com"},
				{id:'122',type:"skype", value:"shirobok-pavel"},
				{id:'123',type:"email", value:"pavel.shirobok@gmail.com"}
			];
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
				iof = i;
				break;
			}
		}
		return iof;
	}
	
	var s = {
		get:function(){

			return list;
		},
		add:function(id, type, value){
			list.push({id:Math.float(Math.random() * 1e6), type:type, value:value});
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
			return s;
		}
	}

	return s;
}]);


app.controller('ContactsController', ['ContactsList', '$scope', function(ContactsList, $scope){
	$scope.contacts = ContactsList.get();
}]);

app.controller('ContactsInputController', ['ContactsList', '$scope', function(ContactsList, $scope){
	$scope.add= function(){
		console.log($scope.type, $scope.value);
	}
}])