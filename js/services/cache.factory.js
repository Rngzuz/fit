fit.service('CacheService', ['$cacheFactory', function ($cacheFactory) {
	return $cacheFactory('Fit');
}]);