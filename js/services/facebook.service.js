fit.service('FacebookService', ['$q', function ($q) {
	var self = this;
	this.isReady = false;
	this.isAuthenticated = false;

	$.getScript('//connect.facebook.net/en_US/sdk.js', function () {
		FB.init({
			appId: '241028562947382',
			cookie: true,
			xfbml: true,
			version: 'v2.5'
		});

		self.isReady = true;

		FB.getLoginStatus(function (response) {
			if (response.status === 'connected') {
				self.isAuthenticated = true;
			} else if (response.status === 'not_authorized') {
				self.isAuthenticated = false;
			} else {
				self.isAuthenticated = false;
			}
		});
	});

	this.login = function () {
		var defer = $q.defer();

		if (self.isAuthenticated) {
			FB.getLoginStatus(function (response) {
				if (response.status === 'connected') {
					self.isAuthenticated = true;
					defer.resolve(response);
				} else if (response.status === 'not_authorized') {
					self.isAuthenticated = false;
					defer.reject(response);
				} else {
					self.isAuthenticated = false;
					defer.reject(response);
				}
			});

			return defer.promise;
		}

		FB.login(function (response) {
			if (response.status === 'connected')
				defer.resolve(response);
			else
				defer.reject(response);

			self.isAuthenticated = true;
		});

		return defer.promise;
	};

}]);