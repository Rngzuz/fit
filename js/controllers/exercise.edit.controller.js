fit.controller('ExerciseEditController', ['$scope', '$state', '$stateParams', 'DataService', 'CacheFactory', function ($scope, $state, $stateParams, DataService, CacheFactory) {
	$scope.data = {};
	$scope.isSaving = false;

	if ($stateParams.id) {
		$scope.isSaving = true;

		if (CacheFactory.get('myData')) {
			for (var i = 0; i < CacheFactory.get('myData').length; i++) {
				var tmp = CacheFactory.get('myData')[i];

				if (tmp['_id'] === $stateParams.id) {
					$scope.data = tmp;
					$scope.isSaving = false;
					break;
				}
			}
		} else {
			DataService.get($stateParams.id)
			.then(
				function (response) {
					$scope.data = response.data;
					$scope.isSaving = false;
					console.log(CacheFactory.get('myData'));
				},
				function (error) {
					console.log(error);
					$state.go('^.list');
					$scope.isSaving = false;
				}
			);
		}
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