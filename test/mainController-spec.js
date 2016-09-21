(function(){
	'use strict';

	describe('main - Test file', function(){

		var $controller;

		beforeEach(module('App'));

		beforeEach(inject(function(_$controller_){
			$controller = _$controller_;
		}));

		describe('First testing...', function(){
			it('should return proper value (true)...', function(){
				var $scope = {};
				var controller = $controller('mainController', { $scope: $scope });
				var res = controller.init();

				expect(res).toEqual(true);
			});
		});

	});

})();