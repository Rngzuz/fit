fit.service('PlanDataService', ['DataService', '$cacheFactory', '$q', function (DataService, $cacheFactory, $q) {
	var endpoint = '';
	var cacheName = 'PlanData';
	var cache = $cacheFactory(cacheName);
	var self = this;

	this.flag = true;

	var dummy = [
		{
			_id: 0,
			name: 'Plan 1',
			exercises: []
		},
		{
			_id: 1,
			name: 'Plan 2',
			exercises: []
		},
		{
			_id: 2,
			name: 'Plan 3',
			exercises: []
		},
		{
			_id: 3,
			name: 'Plan 4',
			exercises: []
		}
	];

	cache.put('Plan', dummy);

	this.get = function (id) {
		var defer = $q.defer();
		var cacheData = cache.get(cacheName);

		if (cacheData && self.flag) {
			for (var i = 0; i < cacheData.length; i++) {
				if (cacheData[i]['_id'] === id) {
					defer.resolve({
						data: cacheData[i]
					});
					break;
				}
			}

			return defer.promise;
		}

		return defer.promise;
	};

	this.getAll = function () {
		var defer = $q.defer();
		var cacheData = cache.get(cacheName);

		if (cacheData && self.flag) {
			defer.resolve({
				data: cacheData
			});

			return defer.promise;
		}

		return defer.promise;
	};

	this.getCache = function () {
		return cache.get(cacheName);
	};

	this.update = function (id, object) {
		var cacheData = cache.get(cacheName);

		if (cacheData) {
			for (var i = 0; i < cacheData.length; i++) {
				if (cacheData[i]['_id'] === id) {
					cacheData.splice(i, 1, object);
					break;
				}
			}

			cache.put(cacheName, cacheData);
		}
	};

	this.create = function (object) {
		var cacheData = cache.get(cacheName);

		if (cacheData) {
			cacheData.push(object);
			cache.put(cacheName, cacheData);
			self.flag = false;
		}
	};

	this.delete = function (id) {
		var cacheData = cache.get(cacheName);

		if (cacheData) {
			for (var i = 0; i < cacheData.length; i++) {
				if (cacheData[i]['_id'] === id) {
					cacheData.splice(i, 1);
					break;
				}
			}

			cache.put(cacheName, cacheData);
		}
	};
}]);