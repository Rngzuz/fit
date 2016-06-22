fit.controller('PlanListController', ['$scope', 'PlanDataService', function ($scope, PlanDataService) {

	$scope.data = {};

	PlanDataService.getAll()
	.then(
		function (response) {
			$scope.data = response.data;
		},
		function (error) {
			console.log(error)
		}
	);


}]);