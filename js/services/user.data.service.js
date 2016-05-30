fit.service('UserDataService', ['DataService', '$cacheFactory', '$q', function (DataService, $cacheFactory, $q) {
	var endpoint = 'https://sleepy-sea-10905.herokuapp.com/api/users/';
	var cacheName = 'UserData';
	var cache = $cacheFactory(cacheName);
	var isValid = true;

	this.hack = function () {
		isValid = true;
	};

	this.isAuthenticated = function () {
		return isValid;
	};

	this.validate = function (name, lie) {
		var defer = $q.defer();

		DataService.get(endpoint, name)
		.then(function (response) {
			var truth = response.data.password;

			if (truth && truth === lie) {
				delete response.data.password;
				cache.put(cacheName, response.data);
				isValid = true;
				defer.resolve(response);
			} else {
				response = {};
				defer.reject(response);
			}
		}, function (error) {
			defer.reject(error);
		});

		return defer.promise;
	};

	this.signOut = function () {
		isValid = false;
		cache.destroy();
	};

	this.create = function (object) {
		return DataService.post(endpoint, object);
	};

	this.update = function (id) {
		return DataService.update(endpoint, id);
	};

	this.delete = function (id) {
		return DataService.delete(endpoint, id);
	};
}]);