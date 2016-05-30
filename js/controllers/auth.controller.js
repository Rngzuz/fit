fit.controller('AuthController', ['$scope', '$state', 'UserDataService', function ($scope, $state, UserDataService) {
	$scope.user = {};
	$scope.register = {};

	$scope.cheat = function () {
		UserDataService.hack();
		$state.go('exercise.list');
	};

	$scope.validate = function (name, lie) {
		UserDataService.validate(name, lie)
		.then(function (response) {
			$state.go('exercise.list');
			console.log(response);
		});
	};

	$scope.register = function () {

	};
}]);