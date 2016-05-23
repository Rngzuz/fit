var fit = angular.module('fit', ['ui.router', 'ngResource']);

fit.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	//Fallback url
	$urlRouterProvider.otherwise('/dashboard');

	$stateProvider
	.state('dashboard', {
		url: '/dashboard',
		templateUrl: 'partial/dashboard.html',
		title: 'Dashboard'
	})
	.state('register', {
		url: '/register',
		templateUrl: 'partial/register.html',
		title: 'Register'
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
		templateUrl: 'partial/plan/plan.list.html'
	})
	.state('plan.create', {
		url: '/create',
		templateUrl: 'partial/plan/plan.create.html'
	})
	.state('plan.edit', {
		url: '/:id',
		templateUrl: 'partial/plan/plan.edit.html'
	});
}])
.run(['$rootScope', '$state', function ($rootScope, $state) {
	//Run blocks will be executed after config blocks and is the closest thing to a main method.

	//Sets the page title and name of the current state
	$rootScope.currentStateTitle = $state.title;
	$rootScope.currentState = $state.name;

	//Updates the page title and name of the current state
	//Params: event, toState, toParams, fromState, fromParams
	$rootScope.$on('$stateChangeStart', function (event, toState) {
		$rootScope.currentStateTitle = toState.title;
		$rootScope.currentState = toState.name;
	});
}]);