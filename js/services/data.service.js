fit
.service('DataService', function ($q, $http, $cacheFactory) {
	var endpoint = 'https://sleepy-sea-10905.herokuapp.com/api/exercises/';

	return {
		//Get an entry using GET
		get: function (id) {
			var defer = $q.defer();

			$http.get(endpoint + encodeURIComponent(id))
			.then(
				function (data) {
					defer.resolve(data);
				},
				function (error) {
					defer.reject(error.status);
				}
			);

			return defer.promise;
		},
		//Create an entry using POST
		post: function (object) {
			var defer = $q.defer();

			$http.post(endpoint, object)
			.then(
				function (data) {
					defer.resolve(data);
				},
				function (error) {
					defer.reject(error.status);
				}
			);

			return defer.promise;
		},
		//Update an entry using PUT
		put: function (id, object) {
			var defer = $q.defer();

			$http.put(endpoint + encodeURIComponent(id), object)
			.then(
				function (data) {
					defer.resolve(data);
				},
				function (error) {
					defer.reject(error.status);
				}
			);

			return defer.promise;
		},
		//Delete an entry using DELETE
		delete: function (id) {
			var defer = $q.defer();

			$http.delete(endpoint + encodeURIComponent(id))
			.then(
				function (data) {
					defer.resolve(data);
				},
				function (error) {
					defer.reject(error.status);
				}
			);

			return defer.promise;
		}
	};
});