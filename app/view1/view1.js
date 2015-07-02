'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    resolve: {
    	words: ["Vocabulary", function(Vocabulary) {
    		return Vocabulary.get();
    	}]
    }
  });
}])
.controller('View1Ctrl', ["$scope", "words", "$http", function($scope, words, $http) {
	$scope.words = words;

	$scope.word = {
		en: "Property",
		ru: "свойство"
	};

	$scope.add = function() {
		if ($scope.word.en in $scope.words) {
			$scope.showError = true;
			return;
		}

		$scope.words[$scope.word.en] = $scope.word.ru.split(", ");
		$scope.word.ru = $scope.word.en = "";
	};

	$scope.save = function() {
		$http.post("/save", $scope.words).success(function(data, status, headers, config) {
			console.log(data);
		})
	};

	
	/*$scope.word = {};
	$scope.vocabulary = Vocabulary.getVocabulary();

	$scope.save = function() {
		if (!$scope.word.ru || !$scope.word.en) return;
		Vocabulary.setWord($scope.word.en, $scope.word.ru);
		refresh();
	};

	function refresh() {
		$scope.vocabulary = Vocabulary.getVocabulary();
		$scope.word.ru = $scope.word.en = "";
	}*/
}]);