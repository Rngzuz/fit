fit.service('UserDataService', ['DataService', '$cacheFactory', '$q', function (DataService, $cacheFactory, $q) {
	var endpoint = 'https://sleepy-sea-10905.herokuapp.com/api/users/';
	var cacheName = 'UserData';
	var cache = $cacheFactory(cacheName);
	var isValid = false;
	var self = this;

	this.isAuthenticated = function () {
		return isValid;
	};

	this.signOut = function () {
		isValid = false;
	};

	this.getCache = function () {
		return cache.get(cacheName);
	};

	this.verify = function (user) {
		var defer = $q.defer();

		DataService.post(endpoint + 'verify', user)
		.then(
			function (response) {
				if (response.status === 200) {
					isValid = true;

					self.get(response.config.data.email)
					.then(function (response) {
						defer.resolve(response);
						cache.put(cacheName, response.data);
					});
				} else defer.reject(response);
			},
			function (error) {
				defer.reject(error);
			}
		);

		return defer.promise;
	};

	this.get = function (email) {
		if (!isValid)
			return false;

		var defer = $q.defer();

		DataService.get(endpoint, email)
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

	this.create = function (object) {
		return DataService.post(endpoint, object);
	};

	this.delete = function (email) {
		if (!isValid)
			return false;

		return DataService.delete(endpoint, email);
	};
}]);