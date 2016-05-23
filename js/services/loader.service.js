fit
.service('LoaderService', function() {
	var $loader = $('#loader');

	return {
		show: function() {
			$loader.show();
		},
		hide: function() {
			$loader.hide();
		}
	}
});