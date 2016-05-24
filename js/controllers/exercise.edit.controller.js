fit.controller('ExerciseEditController', ['$scope', '$rootScope', '$state', '$stateParams', 'ExerciseDataService', function ($scope, $rootScope, $state, $stateParams, ExerciseDataService) {
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

			$rootScope.alertError = {
				visible: true,
				status: error.status,
				message: error.data.error
			};

			$state.go('^.list');
		});
	} else {
		$state.go('^.list');
	}

	$scope.submit = function (form) {
		if (form.$valid) {
			$scope.isSaving = true;

			ExerciseDataService.update($stateParams.id, $scope.data)
			.then(function (response) {
				$scope.isSaving = false;

				$rootScope.alertSuccess = {
					visible: true,
					status: response.status,
					message: $scope.data.name + ' has been updated!'
				};

				$state.go('^.list');
			}, function (error) {
				$scope.isSaving = false;

				$rootScope.alertError = {
					visible: true,
					status: error.status,
					message: error.data.error
				};
			});
		}
	};

	$scope.delete = function () {
		var confirmBox = window.confirm('Are you sure?');

		if (confirmBox) {
			$scope.isSaving = true;

			ExerciseDataService.delete($stateParams.id)
			.then(function (response) {
				$scope.isSaving = false;

				$rootScope.alertSuccess = {
					visible: true,
					status: response.status,
					message: $scope.data.name + ' has been deleted!'
				};

				$state.go('^.list');
			}, function (error) {
				$scope.isSaving = false;

				$rootScope.alertError = {
					visible: true,
					status: error.status,
					message: error.data.error
				};
			});
		}
	};
}]);