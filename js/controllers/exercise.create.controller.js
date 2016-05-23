fit.controller('ExerciseCreateController', ['$scope', '$state', 'ExerciseDataService', function ($scope, $state, ExerciseDataService) {
	$scope.data = {};
	$scope.isSaving = false;

	$scope.submit = function (form) {
		if (form.$valid) {
			$scope.isSaving = true;

			ExerciseDataService.create($scope.data)
			.then(function () {
				$scope.isSaving = false;
				form.$setPristine();
				$scope.data = {};
				$state.go('^.list');
			}, function (error) {
				$scope.isSaving = false;
				console.log(error);
			});
		}
	};
}]);