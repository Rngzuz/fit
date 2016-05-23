fit.controller('ExerciseEditController', ['$scope', '$state', '$stateParams', 'ExerciseDataService', function ($scope, $state, $stateParams, ExerciseDataService) {
	$scope.data = {};
	$scope.isSaving = false;

	if ($stateParams.id) {
		$scope.isSaving = true;

		ExerciseDataService.get($stateParams.id)
		.then(function (response) {
			$scope.isSaving = false;
			$scope.data = response.data;
		}, function (error) {
			$scope.isSaving = false;
			$state.go('^.list');
			console.log(error);
		});
	} else {
		$state.go('^.list');
	}

	$scope.submit = function (form) {
		if (form.$valid) {
			$scope.isSaving = true;

			ExerciseDataService.update($stateParams.id, $scope.data)
			.then(function () {
				$scope.isSaving = false;
				$state.go('^.list');
			}, function (error) {
				$scope.isSaving = false;
				console.log(error);
			});
		}
	};

	$scope.delete = function () {
		var confirmBox = window.confirm('Are you sure?');

		if (confirmBox) {
			$scope.isSaving = true;

			ExerciseDataService.delete($stateParams.id)
			.then(function () {
				$scope.isSaving = false;
				$state.go('^.list');
			}, function (error) {
				$scope.isSaving = false;
				console.log(error);
			});
		}
	};
}]);