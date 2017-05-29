/*global angular:true*/

(function() {

	var vdConfig = function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/");
	};
	vdConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
	angular.module("vd")
	.config(vdConfig);
})();
