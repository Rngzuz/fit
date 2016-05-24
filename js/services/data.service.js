/*
 When a service is injected an instance will be created by angular, which can be in all controllers, services and so on.
 The difference between services and factories is that a service gets instantiated, where a factory is just a function that
 gets executed.
 */

fit.service('DataService', ['$q', '$http', function ($q, $http) {
	this.get = function (endpoint, id) {
		//Return early if no endpoint is defined
		if (angular.isUndefined(endpoint))
			return false;

		//Instantiating a deferred object
		var defer = $q.defer();

		//Assign id false if no value is defined
		id = id || false;

		//Sending GET request to the backend
		$http.get(endpoint + (id ? id : ''))
		.then(
			function (response) {
				//Success scenario
				defer.resolve(response);
			},
			function (error) {
				//Error scenario
				defer.reject(error);
			}
		);

		//A promise object with the response data is returned
		return defer.promise;
	};

	//Create an entry in the database POST
	this.post = function (endpoint, object) {
		//Return early if no endpoint or object is defined
		if (angular.isUndefined(endpoint) || angular.isUndefined(object))
			return false;

		var defer = $q.defer();

		$http.post(endpoint, object)
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

	//Update an entry using PUT
	this.put = function (endpoint, id, object) {
		//Return early if no endpoint, id or object is defined
		if (angular.isUndefined(endpoint) || angular.isUndefined(id) || angular.isUndefined(object))
			return false;

		var defer = $q.defer();

		$http.put(endpoint + id, object)
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

	//Delete an entry using DELETE
	this.delete = function (endpoint, id) {
		//Return early if no endpoint or id is defined
		if (angular.isUndefined(endpoint) || angular.isUndefined(id))
			return false;

		var defer = $q.defer();

		$http.delete(endpoint + id)
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
}]);