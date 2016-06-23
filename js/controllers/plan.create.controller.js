fit.controller('PlanCreateController', ['$scope', 'PlanDataService', 'ExerciseDataService', '$rootScope', '$state', function ($scope, PlanDataService, ExerciseDataService, $rootScope, $state) {
	$scope.isSaving = false;
	$scope.plan = {};

	var schedule = [];

	$scope.data = {};

	//Get all exercises
	ExerciseDataService.getAll()
	.then(
		function (response) {
			$scope.data = response.data;
		},
		function (error) {
			$rootScope.alertError = {
				visible: true,
				status: error.status,
				message: error.data.error
			};
		}
	);

	$scope.submit = function (form) {
		$scope.isSaving = true;
		$scope.plan.schedule = schedule;

		PlanDataService.create($scope.plan)
		.then(
			function (response) {
				$scope.isSaving = false;
				form.$setPristine();

				$rootScope.alertSuccess = {
					visible: true,
					status: response.status,
					message: $scope.plan.name + ' has been created!'
				};

				$scope.data = {};
				$state.go('^.list')
			},
			function (error) {
				$scope.isSaving = false;
				$rootScope.alertError = {
					visible: true,
					status: error.status,
					message: error.data.error
				};

				$state.go('^.list');
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