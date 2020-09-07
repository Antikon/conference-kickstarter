zaa.factory('confChangedSelectsService', function() {
	var selects = {};


	var addSelect = function(newObj) {
		console.log('want to add select');
		if (newObj.id !== undefined) {
			selects[newObj.id] = newObj;
		}
	};

	var getSelects = function(){
		console.log('get selects');
		return selects;
	};

	var clearSelects = function(){
		console.log('clear selects');
		var selects = {};
	};

	return {
		addSelect: addSelect,
		getSelects: getSelects,
		clearSelects: clearSelects
	};

});



zaa.factory('confBroadcastService', ['$http', '$interval', '$rootScope', '$sce', 'AdminLangService', function($http, $interval, $rootScope, $sce, AdminLangService) {

	var showPreview = function(type, url, options) {

		return $http({
			method: 'GET',
			url: url,
			params: {
				'mode': type,
				'options': options
			}
		}).then(function(response) {
			if (response.data.status === 'success') {
				let total = response.data.total;
				let responsePreview = response.data.preview;
				let lastEmail = response.data.lastEmail;
				let remaining = response.data.remaining;
				let percent = response.data.percent;
				let lastAccess = response.data.lastAccess;

				var preview   = {};

				angular.forEach(AdminLangService.data, function(value, key) {
					if (responsePreview[value.short_code]) {
						preview[value.short_code] = $sce.trustAsHtml(responsePreview[value.short_code]);
					}
				});

				return {
					'total': total,
					'preview': preview,
					'lastEmail': lastEmail,
					'remaining': remaining,
					'percent': percent,
					'lastAccess': response.data.lastAccess,

				};

			} else {
				let lastEmail = response.data.message;
				return {
					'status': response.data.status,
					'lastEmail': lastEmail,
				};
			}
		});

	};


	var sendOneMail = function(type, url, options) {
		return $http({
			method: 'GET',
			url: url,
			params: {
				'mode': type,
				'options': options
			}
		}).then(function(response) {

			var lastEmail, percent, remaining;

			if (response.data.status === 'success') {
				lastEmail = response.data.lastEmail;
				percent   = response.data.percent;
				remaining = response.data.remaining;

				return {
					'status': response.data.status,
					'lastEmail': lastEmail,
					'percent': percent,
					'remaining': remaining,
				};

			} else {
				lastEmail = response.data.message;
				return {
					'status': response.data.status,
					'lastEmail': lastEmail,
				};
			}

		});

	};

	return {
		showPreview: showPreview,
		sendOneMail: sendOneMail,
	};

}]);