'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.filter("wordWithComma", function() {
	return function(words) {
		return words.join(", ");
	};
})
.factory('Vocabulary',['$resource', function($resource){
	return $resource("words/words.json", {
		save: {method: "POST"}
	});
}])
.directive('blurMe', function(){
	// Runs during compile
	return {
		restrict: "A",
		scope: {},
		link: function($scope, iElm, iAttrs, controller) {
			iElm.on("click", function() {
				iElm[0].blur();
				document.getElementsByClassName("word")[0].focus();
			})
		}
	};
});
