fit.service('ExerciseDataService', ['DataService', function (DataService) {
	var endpoint = 'https://sleepy-sea-10905.herokuapp.com/api/exercises/';

	this.get = function (id) {
		return DataService.get(endpoint, id);
	};

	this.getAll = function () {
		return DataService.get(endpoint);
	};

	this.update = function (id, object) {
		return DataService.put(endpoint, id, object);
	};

	this.create = function (object) {
		return DataService.post(endpoint, object);
	};

	this.delete = function (id) {
		return DataService.delete(endpoint, id);
	};
}]);