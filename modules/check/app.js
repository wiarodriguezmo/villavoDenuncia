/*global headerTemplate:true*/
/*global angular:true*/

var checkConfig = function($stateProvider){
  $stateProvider
  .state("check",{
    url: "/check",
    requireAuth : true,
    rolesAccepted : ["admin"],
    cache: true,
    views: {
      "header": {
        templateUrl: headerTemplate
      },
      "container@": {
        templateUrl: "app/modules/check/views/check.html"
      }
    }
  });
};
checkConfig.$inject = ["$stateProvider"];
angular.module("check",[])
.config(checkConfig);
