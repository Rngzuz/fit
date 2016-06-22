fit.controller('AuthController', ['$scope', '$rootScope', '$state', 'UserDataService', 'FacebookService', function ($scope, $rootScope, $state, UserDataService, FacebookService) {
	$scope.isSaving = false;
	$scope.user = {};
	$scope.register = {
		email: 'email@example.com',
		password: {
			first: 'abc#123',
			second: 'abc#123'
		},
		name: 'Tobias',
		lastname: 'Wiedemann',
		metric: 'Kilograms',
		weight: 73,
		height: 181
	};

	$scope.facebookTest = "You are not logged in.";

	$scope.cheat = function () {
		FacebookService.login().then(
			function (response) {
				FB.api('/me', {fields: 'name'}, function(response) {
					$scope.facebookTest = 'You are now logged in as ' + response.name;
					console.log(response);
				});
			},
			function (error) {
				$scope.facebookTest = 'An error occurred.'
			}
		);
	};

	$scope.validate = function (name, lie) {
		UserDataService.validate(name, lie)
		.then(function (response) {
			$state.go('exercise.list');
			console.log(response);
		});
	};

	$scope.registerUser = function (form) {
		var first = $scope.register.password.first;
		var second = $scope.register.password.second;

		if (angular.equals(first, second)) {
			$scope.isSaving = true;

			$scope.register.password = first;

			UserDataService.create($scope.register)
			.then(function (response) {
				console.log(response);

				$rootScope.alertSuccess = {
					visible: true,
					status: response.status,
					message: 'User has been created!'
				};

				$scope.isSaving = false;
				$scope.register = {
					metric: 'Kilograms'
				};
			}, function (error) {
				$rootScope.alertError = {
					visible: true,
					status: error.status,
					message: error.data.error
				};

				$scope.isSaving = false;
				console.log(error);
			});
		}

	};
}]);