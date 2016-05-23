fit.service('CacheService', ['$cacheFactory', function ($cacheFactory) {
	this.user = function () {
		return $cacheFactory('UserCache');
	};

	this.exercise = function () {
		return $cacheFactory('ExerciseCache');
	};

	this.plan = function () {
		return $cacheFactory('PlanCache');
	};
}]);