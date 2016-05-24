fit
.controller('ExerciseListController', ['$scope', 'ExerciseDataService', 'CacheFactory', function ($scope, ExerciseDataService, CacheFactory) {
	var cache = CacheFactory.cache.get('CacheData');

	$scope.data = [];

	if (cache && !CacheFactory.getFlag()) {
		$scope.data = cache;
	} else {
		ExerciseDataService.getAll()
		.then(
			function (response) {
				$scope.data = response.data;
				CacheFactory.cache.put('CacheData', response.data);
			},
			function (error) {
				console.log(error);
			}
		);
	}
}]);