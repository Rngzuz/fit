fit.service('PlanDataService', ['DataService', 'UserDataService', 'ExerciseDataService', '$cacheFactory', '$q', function (DataService, UserDataService, ExerciseDataService, $cacheFactory, $q) {
	var endpoint = 'https://sleepy-sea-10905.herokuapp.com/api/users/';
	var cacheName = 'PlanData';
	var cache = $cacheFactory(cacheName);
	var userCacheData = UserDataService.getCache();
	var self = this;

	this.flag = false;

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

		self.getAll()
		.then(function (response) {
			for (var i = 0; i < cacheData.length; i++) {
				if (cacheData[i]['_id'] === id) {
					defer.resolve({
						data: cacheData[i]
					});
					break;
				}
			}
		});

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

		DataService.get(endpoint + userCacheData.email + '/plans')
		.then(
			function (response) {
				self.flag = true;
				cache.put(cacheName, response.data);
				defer.resolve(response);
			},
			function (error) {
				defer.reject(error);
			}
		);

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
		var defer = $q.defer();

		DataService.post(endpoint + userCacheData.email + '/plans', object)
		.then(
			function (response) {
				defer.resolve(response);
			},
			function (error) {
				defer.reject(error);
			}
		);

		return defer.promise;
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