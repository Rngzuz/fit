fit
.controller('ExerciseListController', ['$scope', 'ExerciseDataService', function ($scope, ExerciseDataService) {
	$scope.data = [];

	ExerciseDataService.getAll()
	.then(
		function (response) {
			$scope.data = response.data;
		},
		function (error) {
			console.log(error);
		}
	);
}]);