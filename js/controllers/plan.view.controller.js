fit.controller('PlanViewController', ['$scope', 'PlanDataService', '$state', '$stateParams', '$rootScope', function ($scope, PlanDataService, $state, $stateParams, $rootScope) {
	$scope.isSaving = false;
	$scope.data = {};

	if ($stateParams.id) {
		PlanDataService.get($stateParams.id)
		.then(
			function (response) {
				$scope.data = response.data;
			},
			function (error) {
				console.log(error)
			}
		);
	}

	$scope.delete = function () {
		if ($stateParams.id) {
			$scope.isSaving = true;

			PlanDataService.delete($stateParams.id)
			.then(
				function (response) {
					$rootScope.alertSuccess = {
						visible: true,
						status: response.status,
						message: $scope.data.name + ' has been deleted!'
					};

					$scope.isSaving = false;
					$state.go('^.list');
				},
				function (error) {
					$rootScope.alertError = {
						visible: true,
						status: error.status,
						message: error.data.error
					};

					$scope.isSaving = false;
					$state.go('^.list');
				}
			);
		}
	};
}]);