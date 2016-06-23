fit.controller('NavController', ['$scope', 'UserDataService', '$state', function ($scope, UserDataService, $state) {

	$scope.getUser = function () {
		if (!UserDataService.isAuthenticated())
			return false;

		return UserDataService.getCache();
	};

	$scope.isValid = function () {
		return UserDataService.isAuthenticated();
	};

	$scope.signOut = function () {
		UserDataService.signOut();
		$state.go('auth');
	};
}]);