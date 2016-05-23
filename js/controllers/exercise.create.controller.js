fit
.controller('ExerciseCreateController', function ($scope, $state, FitDataService) {
	$scope.data = {};
	$scope.isSaving = false;

	$scope.submit = function (form) {
		if (form.$valid) {
			$scope.isSaving = true;

			FitDataService.post($scope.data)
			.then(
				function () {
					form.$setPristine();
					$scope.data = {};
					$scope.isSaving = false;
					$state.go('^.list');
				},
				function (error) {
					$scope.isSaving = false;
					console.log(error);
				}
			);
		}
	};
});