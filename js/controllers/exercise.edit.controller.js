fit.controller('ExerciseEditController', ['$scope', '$state', '$stateParams', 'DataService', function ($scope, $state, $stateParams, DataService) {
	$scope.data = {};
	$scope.isSaving = false;

	if ($stateParams.id) {
		$scope.isSaving = true;

		DataService.get($stateParams.id)
		.then(
			function (response) {
				$scope.data = response.data;
				$scope.isSaving = false;
			},
			function (error) {
				console.log(error);
				$state.go('^.list');
				$scope.isSaving = false;
			}
		);
	} else {
		$state.go('^.list');
		console.log('No ID were specified.')
	}

	$scope.submit = function (form) {
		if (form.$valid) {
			$scope.isSaving = true;

			DataService.put($stateParams.id, $scope.data)
			.then(
				function () {
					$state.go('^.list');
					$scope.isSaving = false;
				},
				function (error) {
					console.log(error);
					$scope.isSaving = false;
				}
			);
		}
	};

	$scope.delete = function () {
		$scope.isSaving = true;

		var confirmBox = window.confirm('Are you sure that you want to delete the exercise ' + $scope.data.name + '.');

		if (confirmBox) {
			DataService.delete($stateParams.id)
			.then(function () {
				$state.go('^.list');
			});
		} else {
			$scope.isSaving = false;
		}
	};
}]);