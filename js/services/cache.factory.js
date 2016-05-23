fit.factory('CacheFactory', ['$cacheFactory', function ($cacheFactory) {
	return $cacheFactory('myData');
}]);