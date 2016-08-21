(function(){
	'use-strict';

	angular
		.module('App')
		.controller('mainController', mainController);

	mainController.$inject = ['$timeout']

	function mainController($timeout){
		var vm = this;

		// Declaration
		vm.init = init;

		// Definition
		function init(){
			vm.weather = {
				'short_date': moment().format("MMM DD"),
				'description': 'Cloudy skies',
				'temperature': 28,
				'location': 'Terrassa, Barcelona',
				'mph': 2,
				'humidity': 22,
				'sunlight': 80,
				'reload': function(){
					// Override reload function
					console.log("Weather widget reloaded...!");
				}
			}	
		}

		vm.init();
	}

})();