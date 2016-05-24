fit.controller('ExerciseCreateController', ['$scope', '$state', 'ExerciseDataService', '$rootScope', function ($scope, $state, ExerciseDataService, $rootScope) {
	$scope.data = {};
	$scope.isSaving = false;

	$scope.submit = function (form) {
		if (form.$valid) {
			$scope.isSaving = true;

			ExerciseDataService.create($scope.data)
			.then(function (response) {
				$scope.isSaving = false;
				form.$setPristine();

				$rootScope.alertSuccess = {
					visible: true,
					status: response.status,
					message: $scope.data.name + ' has been created!'
				};

				$scope.data = {};
				$state.go('^.list');
			}, function (error) {
				$scope.isSaving = false;

				$rootScope.alertError = {
					visible: true,
					status: error.status,
					message: error.data.error
				};

				$state.go('^.list');

				console.log(error);
			});
		}
	};
}]);