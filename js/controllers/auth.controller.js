fit.controller('AuthController', ['$scope', '$rootScope', '$state', 'UserDataService', function ($scope, $rootScope, $state, UserDataService) {
	$scope.isSaving = false;
	$scope.user = {
		email: 'email@example.com',
		password: 'abc#123'
	};
	$scope.register = {
		email: 'email@example.com',
		password: {
			first: 'abc#123',
			second: 'abc#123'
		},
		name: 'Tobias',
		lastname: 'Wiedemann',
		level: 0,
		metric: 'Kilograms',
		weight: 73,
		height: 181
	};

	$scope.verify = function () {
		UserDataService.verify($scope.user)
		.then(
			function () {
				console.log(UserDataService.getCache());
				$state.go('exercise.list');
			},
			function (error) {
				console.log(error);
			}
		);
	};

	$scope.registerUser = function () {
		var first = $scope.register.password.first;
		var second = $scope.register.password.second;

		if (angular.equals(first, second)) {
			$scope.isSaving = true;

			$scope.register.password = first;

			UserDataService.create($scope.register)
			.then(function (response) {
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