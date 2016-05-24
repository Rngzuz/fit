fit.factory('CacheFactory', ['$cacheFactory', function ($cacheFactory) {
	var flag = false;

	return {
		cache: $cacheFactory('CacheData'),
		setFlag: function (val) {
			flag = val;
		},
		getFlag: function () {
			return flag;
		}
	}
}]);