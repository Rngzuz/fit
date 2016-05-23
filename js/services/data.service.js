/*
When a service is injected an instance will be created by angular, which can be in all controllers, services and so on.
The difference between services and factories is that a service gets instantiated, where a factory is just a function that
gets executed.
*/

fit.service('DataService', ['$q', '$http', function ($q, $http) {
	var endpoint = 'https://sleepy-sea-10905.herokuapp.com/api/exercises/';

	//Get an entry using GET
	this.get = function (id) {
		id = id || false;
		var defer = $q.defer();

		$http.get(endpoint + (id ? id : ''))
		.then(
			function (data) {
				defer.resolve(data);
			},
			function (error) {
				defer.reject(error.status);
			}
		);

		return defer.promise;
	};


	//Create an entry using POST
	this.post = function (object) {
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
	};

	//Update an entry using PUT
	this.put = function (id, object) {
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
	};

	//Delete an entry using DELETE
	this.delete = function (id) {
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
	};
}]);