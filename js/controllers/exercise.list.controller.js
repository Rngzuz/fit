fit
.controller('ExerciseListController', ['$scope', 'ExerciseDataService', function ($scope, ExerciseDataService) {
	$scope.data = [];

	ExerciseDataService.getAll()
	.then(
		function (response) {
			$scope.data = response.data;
			console.log(ExerciseDataService.getCache());
		},
		function (error) {
			console.log(error);
		}
	);
}]);