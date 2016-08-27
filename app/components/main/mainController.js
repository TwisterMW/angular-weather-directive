(function(){
	'use-inputict';

	angular
		.module('App')
		.filter('celsius', celsius)
		.filter('capitalize', capitalize)
		.controller('mainController', mainController);

	mainController.$inject = ['$timeout', '$http']

	function mainController($timeout, $http){
		var vm = this;

		// Declaration
		vm.init = init;

		// Definition
		function init(){
			vm.weather = {
				'short_date': '',
				'location': 'Terrassa, Barcelona',
				'owData': {},
				'icon_list': {},
				'parse_icons': function(){
					$http.get('./assets/weather-icons/weather-icons.json')
						.then(function(result){
							vm.weather.icon_list = result.data;
							vm.weather.api_call(vm.weather.location);
						});
				},
				'api_call': function(location){
					$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location)
						.then(function(gApiData){
							var lat, lon;

							if(gApiData.data.results.length > 0){
								lat = gApiData.data.results[0].geometry.location.lat;
								lon = gApiData.data.results[0].geometry.location.lng;
							}
							
							var api_key = "&APPID=18a4db4eaca2f95180dbabb7fa6c97ca"

							$http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + api_key)
								.then(function(owData){
									vm.weather.owData = owData.data;
									vm.weather.owData.weather[0].icon = vm.weather.icon_list[vm.weather.owData.weather[0].icon];
									vm.weather.owData.wind.speed = Math.round(vm.weather.owData.wind.speed * 36);

									vm.weather.short_date = moment(new Date(vm.weather.owData.dt * 1000)).format('MMM DD');
								});
						});
				}
			}

			vm.weather.parse_icons();
		}

		vm.init();
	}

	function celsius(){
		return function(input){
			return parseInt(input) - 273;
		}
	}

	function capitalize(){
		return function(input){
			if(input != null){
				input = input.toLowerCase().split(' ');

				for(var i = 0; i < input.length; i++){
			        input[i] = input[i].split('');
			        input[i][0] = input[i][0].toUpperCase();
			        input[i] = input[i].join('');
			    }

			    return input.join(' ');
			}
		}
	}

})();