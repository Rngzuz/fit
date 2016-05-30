fit.controller('NavController', ['$scope', 'UserDataService', '$state', function ($scope, UserDataService, $state) {
	$scope.isValid = function () {
		return UserDataService.isAuthenticated();
	};

	$scope.signOut = function () {
		UserDataService.signOut();
		$state.go('auth');
	};
}]);