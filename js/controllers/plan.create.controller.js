fit.controller('PlanCreateController', ['$scope', 'PlanDataService', 'ExerciseDataService', function ($scope, PlanDataService, ExerciseDataService) {
	$scope.plan = {
		name: '',
		schedule: {}
	};

	var schedule = [];

	$scope.data = {};

	ExerciseDataService.getAll()
	.then(
		function (response) {
			$scope.data = response.data;
			console.log(response.data);
		},
		function (error) {
			console.log(error);
		}
	);

	$scope.submit = function () {
		$scope.plan.schedule = schedule;
		console.log($scope.plan);

		PlanDataService.create($scope.plan)
		.then(
			function (response) {
				console.log(response)
			},
			function (error) {
				console.log(error)
			}
		)

	};

	$scope.toggleExercise = function (e) {
		if (e.target.checked) {
			schedule.push({
				_id: e.target.value,
				repeat: 0
			});
		} else {
			for (var i = 0; i < schedule.length; i++) {
				if (schedule[i]['_id'] === e.target.value)
					schedule.splice(i, 1);
			}
		}
	};

}]);