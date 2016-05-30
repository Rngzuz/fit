fit.controller('AuthController', ['$scope', '$rootScope', '$state', 'UserDataService', function ($scope, $rootScope, $state, UserDataService) {
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