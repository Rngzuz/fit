var fit = angular.module('fit', ['ui.router']);

//Application configurations
fit.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	//Fallback url
	$urlRouterProvider.otherwise('/auth');

	//Abstract states are not accessible and requires at least 1 child state
	$stateProvider
	.state('auth', {
		url: '/auth',
		templateUrl: 'partial/auth.html',
		controller: 'AuthController',
		title: 'Authentication'
	});

	$stateProvider
	.state('exercise', {
		abstract: true,
		url: '/exercise',
		template: '<div data-ui-view=""></div>'
	})
	.state('exercise.list', {
		url: '',
		templateUrl: 'partial/exercise/exercise.list.html',
		controller: 'ExerciseListController',
		title: 'Exercises - List'
	})
	.state('exercise.create', {
		url: '/create',
		templateUrl: 'partial/exercise/exercise.create.html',
		controller: 'ExerciseCreateController',
		title: 'Exercises - Create'
	})
	.state('exercise.edit', {
		url: '/:id',
		templateUrl: 'partial/exercise/exercise.edit.html',
		controller: 'ExerciseEditController',
		title: 'Exercises - Edit'
	});

	$stateProvider
	.state('plan', {
		abstract: true,
		url: '/plan',
		template: '<div data-ui-view=""></div>'
	})
	.state('plan.list', {
		url: '',
		templateUrl: 'partial/plan/plan.list.html',
		controller: 'PlanListController',
		title: 'Plan - List'
	})
	.state('plan.create', {
		url: '/create',
		templateUrl: 'partial/plan/plan.create.html',
		controller: 'PlanCreateController',
		title: 'Plan - Create'
	})
	.state('plan.edit', {
		url: '/:id',
		templateUrl: 'partial/plan/plan.edit.html',
		title: 'Plan - Edit'
	});
}])
//Run blocks will be executed once after config blocks and is the closest thing to a main method.
.run(['$rootScope', '$state', 'UserDataService', function ($rootScope, $state, UserDataService) {
	$rootScope.alertSuccess = {
		visible: false,
		status: '',
		message: ''
	};

	$rootScope.alertError = {
		visible: false,
		status: '',
		message: ''
	};

	//Sets the page title and name of the current state
	$rootScope.currentStateTitle = $state.title;
	$rootScope.currentState = $state.name;

	//Updates the page title and name of the current state
	//Params: event, toState, toParams, fromState, fromParams
	$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState, fromStateParams) {
		var isValid = UserDataService.isAuthenticated();

		//Prevents user from accessing any other states than auth if not logged in
		if (!isValid) {
			if (toState.name.indexOf('auth') == -1) {
				event.preventDefault();
				$state.go('auth');
			}
			$rootScope.currentStateTitle = 'Authentication';
			$rootScope.currentState = 'auth';
		}
		//Prevents user from accessing the auth state when logged in
		else if (isValid && toState.name === 'auth') {
			$state.go(fromState.name, fromStateParams);
		}
		//Goes to the requested state if user is logged in
		else if (isValid) {
			$rootScope.currentStateTitle = toState.title;
			$rootScope.currentState = toState.name;
		}
	});
}]);